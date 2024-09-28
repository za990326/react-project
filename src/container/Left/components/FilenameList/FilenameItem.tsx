import React, { ReactNode } from "react";

export default function FilenameItem(props: {
  name: string;
  selected: boolean;
  onClick: () => void;
}): ReactNode {
  const { name, selected, onClick } = props;

  return <div onClick={onClick}>{name}</div>;
}
