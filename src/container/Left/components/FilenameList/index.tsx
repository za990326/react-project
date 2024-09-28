import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../../PlayGroundContext";

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

  return (
    <div>
      {tabs.map((item, index) => {
        return (
          <div key={index} onClick={() => setSelectedFileName(item)}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
