import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../../PlayGroundContext";
import FilenameItem from "./FilenameItem";
import styles from "./index.module.scss";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../../utils/file";
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
  const [creating, setCreating] = useState(false);
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, oldName: string) => {
    if (name === oldName) {
      return;
    }
    updateFileName(oldName, name);
    setSelectedFileName(name);

    setCreating(false);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  // 添加按钮
  const addTab = () => {
    addFile("Comp" + Math.random().toString().substring(2, 8) + ".tsx");
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };
  return (
    <div className={styles.filenameList}>
      {tabs.map((item, index, arr) => {
        return (
          <FilenameItem
            key={item + index}
            name={item}
            readonly={readonlyFileNames.includes(item)}
            selected={selectedFileName === item}
            creating={creating && index === arr.length - 1}
            onClick={() => setSelectedFileName(item)}
            onEditComplete={(name: string) => handleEditComplete(name, item)}
            onRemove={() => {
              handleRemove(item);
            }}
          ></FilenameItem>
        );
      })}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
