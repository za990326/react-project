import { PlaygroundProvider } from "./PlayGroundContext";
import Playground from "./container";

function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  );
}

export default App;
