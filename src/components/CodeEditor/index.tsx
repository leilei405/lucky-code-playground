import { useContext } from "react";
import { debounce } from "lodash-es";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import styles from "./index.module.scss";
import { PlaygroundContext } from "../../context";

export default function CodeEditor() {
  const { theme, files, setFiles, selectedFileName } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div className={styles.editor}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 800)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}
