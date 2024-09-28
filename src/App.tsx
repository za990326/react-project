import Header from "./container/Header";
import Left from "./container/Left";
import Right from "./container/Right";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { PlaygroundProvider } from "./PlayGroundContext";

import styles from "./App.module.scss";

function App() {
  return (
    <PlaygroundProvider>
      <div className={styles.app}>
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
    </PlaygroundProvider>
  );
}

export default App;
