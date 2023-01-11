import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import Main from "./components/Main";
import { LangContext } from "./context/LangContext";

function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  return (
    <>
      <LangContext.Provider value={{ isEnglish, setIsEnglish }}>
        <Header />
        <Main />
      </LangContext.Provider>
    </>
  );
}

export default App;
