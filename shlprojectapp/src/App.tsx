import { useState } from "react";
import logo from "./shlLogo.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <img src={logo} className="logo" alt="Test logo" />
          <h3> Login</h3>
          <h3> Top 10</h3>
          <h3> Player Graphing</h3>
          <h3> Team Graphing</h3>
          <h3> Player Statistics</h3>
          <h3> Team Statistics</h3>
          <h3> Ideal Build</h3>
          <h3> Profile</h3>
        </div>
      </div>
      <body>Hello World!</body>
    </>
  );
}

export default App;
