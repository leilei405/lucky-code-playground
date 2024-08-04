import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../context";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  const handleClickTab = (name: string) => {
    setSelectedFileName(name);
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item, idx) => (
        <FileNameItem
          key={item + idx}
          value={item}
          actived={selectedFileName === item}
          onClick={() => handleClickTab(item)}
        ></FileNameItem>
      ))}
    </div>
  );
}
