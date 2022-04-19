import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Sidebar />
      </div>
    </>
  );
}

export default App;
