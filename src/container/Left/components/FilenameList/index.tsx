import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../../PlayGroundContext";
import FilenameItem from "./FilenameItem";
import styles from "./index.module.scss";
export default function FilenameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    setFiles,
    addFile,
    removeFile,
    updateFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, oldName: string) => {
    if (name === oldName) {
      return;
    }
    updateFileName(oldName, name);
    setSelectedFileName(name);
  };

  return (
    <div className={styles.filenameList}>
      {tabs.map((item, index) => {
        return (
          <FilenameItem
            key={item + index}
            name={item}
            selected={selectedFileName === item}
            onClick={() => setSelectedFileName(item)}
            onEditComplete={(name: string) => handleEditComplete(name, item)}
          ></FilenameItem>
        );
      })}
    </div>
  );
}
