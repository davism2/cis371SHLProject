import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Top10 from "./components/Top10";
import LogInPage from "./components/Login"
import { initializeApp } from "firebase/app";
import  firebaseConfig from "./myconfig";

initializeApp(firebaseConfig);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        {/* <Sidebar /> */}
        <LogInPage />
        {/* <h1 className="Content"> Hello World!</h1> */}
      </div>
    </>
  );
}

export default App;
