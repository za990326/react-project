import React, { useEffect, useRef, useState } from "react";
import cs from "classnames";
import styles from "./index.module.scss";
import { Popconfirm } from "antd";

interface FilenameItemProps {
  name: string;
  selected: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onRemove: () => void;
  onEditComplete: (name: string) => void;
}

const FilenameItem: React.FC<FilenameItemProps> = (
  props: FilenameItemProps
) => {
  const {
    name,
    selected,
    onClick,
    onEditComplete,
    creating,
    onRemove,
    readonly,
  } = props;
  // 是否编辑
  const [value, setValue] = useState(name);
  const [editing, setEditing] = useState(creating);

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
  // 父组件控制文件的编辑
  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

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
        <>
          <span onDoubleClick={!readonly ? doubleClickHandle : () => {}}>
            {value}
          </span>
          {!readonly ? (
            <Popconfirm
              title="确认删除该文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={(e) => {
                e?.stopPropagation();
                onRemove();
              }}
            >
              <span style={{ marginLeft: 5, display: "flex" }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
    </div>
  );
};

export default FilenameItem;
