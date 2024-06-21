import Dictionary from "./components/Dictionary";
import Settings from "./components/Settings";

import "./styles/App.css";
function App() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Dictionary />
      <Settings />
    </main>
  );
}

export default App;
