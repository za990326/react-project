import React, { ReactNode, useRef, useState } from "react";
import cs from "classnames";
import styles from "./index.module.scss";

export default function FilenameItem(props: {
  name: string;
  selected: boolean;
  onClick: () => void;
}): ReactNode {
  const { name, selected, onClick } = props;
  // 是否编辑
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const doubleClickHandle = () => {
    setEditing(true);
    inputRef.current?.focus();
  };

  return (
    <div
      className={cs(styles.filenameItem, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {editing ? (
        <input
          value={value}
          ref={inputRef}
          onBlur={() => setEditing(false)}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span onDoubleClick={doubleClickHandle}>{value}</span>
      )}
    </div>
  );
}
