import { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../../context";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../../pages//ReactPlayground/files";
import { Message } from "../Message";
import CompilerWorker from "./compiler.worker?worker";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const [error, setError] = useState("");

  const compilerWorkerRef = useRef<Worker>();

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    compilerWorkerRef.current?.postMessage(files);
  }, [files]);

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data;
    if (type === "ERROR") {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      <Message type="error" content={error} />
    </div>
  );
}
