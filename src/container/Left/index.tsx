import { ReactNode, useContext } from "react";

import styles from "./index.module.scss";
import FilenameList from "./components/FilenameList";
import EditorComponent, { EditorFile } from "./components/Editor";
import { PlaygroundContext } from "../../PlayGroundContext";

export default function Left(): ReactNode {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext);
  const file: EditorFile = files[selectedFileName];
  const changeHandler = (...args: any[]) => {
    console.log("dwss");
    setFiles({ ...files, [selectedFileName]: { ...file, value: args[0] } });
  };

  return (
    <div className={styles.left}>
      <FilenameList />
      <EditorComponent file={file} onChange={changeHandler} />
    </div>
  );
}
