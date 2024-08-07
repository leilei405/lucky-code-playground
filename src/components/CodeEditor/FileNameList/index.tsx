import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../context";
import { FileNameItem } from "./FileNameItem";
import {
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
  APP_COMPONENT_FILE_NAME,
} from "../../../pages/ReactPlayground/files";
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
  const [, setCreating] = useState(false);

  const handleClickTab = (name: string) => {
    setSelectedFileName(name);
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  // 修改文件名
  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreating(false);
  };

  // 添加文件
  const addTab = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((item, idx, arr) => (
        <FileNameItem
          key={item + idx}
          value={item}
          actived={selectedFileName === item}
          creating={idx === arr.length - 1}
          onClick={() => handleClickTab(item)}
          onRemove={() => {
            handleRemove(item);
          }}
          readonly={readonlyFileNames.includes(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
        ></FileNameItem>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
