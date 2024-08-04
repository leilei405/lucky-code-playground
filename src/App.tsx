import ReactPlayground from "./pages/ReactPlayground";
import { PlaygroundProvider } from "./context";
import "./App.scss";

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
