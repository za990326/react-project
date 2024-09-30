import React, { useRef, useState } from "react";
import cs from "classnames";
import styles from "./index.module.scss";

interface FilenameItemProps {
  name: string;
  selected: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
}

const FilenameItem: React.FC<FilenameItemProps> = (
  props: FilenameItemProps
) => {
  const { name, selected, onClick, onEditComplete } = props;
  // 是否编辑
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const doubleClickHandle = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const blurHandle = () => {
    setEditing(false);
    onEditComplete(value);
  };

  return (
    <div
      className={cs(styles.filenameItem, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {editing ? (
        <input
          className={styles.filenameInput}
          value={value}
          ref={inputRef}
          onBlur={blurHandle}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span onDoubleClick={doubleClickHandle}>{value}</span>
      )}
    </div>
  );
};

export default FilenameItem;
