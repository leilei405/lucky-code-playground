import Editor from "./Editor";
import FileNameList from "./FileNameList";
import styles from "./index.module.scss";

export default function CodeEditor() {
  const file = {
    name: "lucky.tsx",
    value: 'import lodash from "lodash";\n\nconst a = <div>lucky</div>',
    language: "typescript",
  };

  function onEditorChange() {
    console.log(...arguments);
  }

  return (
    <div className={styles.editor}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
