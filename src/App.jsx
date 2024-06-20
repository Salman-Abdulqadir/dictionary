import Dictionary from "./components/Dictionary";
import Settings from "./components/Settings";
import ThemeChanger from "./components/ThemeChanger";

import "./styles/App.css";
function App() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Dictionary />
      <Settings />
      <div className="fixed bottom-8 right-8">
        <ThemeChanger />
      </div>
    </main>
  );
}

export default App;
