import Header from "./Header";
import Left from "./Left";
import Right from "./Right";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { PlaygroundContext } from "../PlayGroundContext";
import "./index.scss";
import { useContext } from "react";

function Playground() {
  const { theme } = useContext(PlaygroundContext);

  return (
    <div
      className={theme}
      style={{
        height: "100vh",
        boxSizing: "border-box",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <Header />
      <Allotment>
        <Allotment.Pane minSize={450}>
          <Left />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Right />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default Playground;
