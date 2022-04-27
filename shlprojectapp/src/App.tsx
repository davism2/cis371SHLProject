import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Top10 from "./components/Top10";
import LogInPage from "./components/Login"
import PrivProfile from "./components/profile"

import { initializeApp } from "firebase/app";
import  firebaseConfig from "./myconfig";
import { Route, Routes } from "react-router-dom";
import { getFirestore } from "firebase/firestore";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function App() {
const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        { <Sidebar /> }
        { <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route path="/top10" element={<Top10/>}/>
          <Route path="/profile" element={<PrivProfile/>}/>
        </Routes> }
        {/* <h1 className="Content"> Hello World!</h1> */}
      </div>
    </>
  );
}

export default App;
