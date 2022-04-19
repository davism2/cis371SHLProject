import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Top10 from "./Components/Top10";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        {/* <Sidebar /> */}
        <Top10 />
        {/* <h1 className="Content"> Hello World!</h1> */}
      </div>
    </>
  );
}

export default App;
