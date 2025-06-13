import "./App.css";
import { GiphyProvider } from "./context/GiphyContext";
import GifGrid from "./GifGrid";

function App() {
  return (
    <GiphyProvider>
      <GifGrid />
    </GiphyProvider>
  );
}

export default App;
