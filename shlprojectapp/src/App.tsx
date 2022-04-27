import { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import  firebaseConfig from "./myconfig";
import { Route, Routes } from "react-router-dom";
import { getFirestore } from "firebase/firestore";

import Sidebar from "./components/Sidebar";
import Top10 from "./components/Top10";
import LogInPage from "./components/Login"
import PrivProfile from "./components/profile"
import NewAccount from "./components/create"
import PubAccount from "./components/pubUsers";
import PlayerGraphing from "./components/playerGraphing";


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
          <Route path="/public" element={<PubAccount/>}/>
          <Route path="/create" element={<NewAccount/>}/>
          <Route path="/top10" element={<Top10/>}/>
          <Route path="/profile" element={<PrivProfile/>}/>
          <Route path="playerGraphic" element={<playerGraphing/>}/>
        </Routes> } 
         {/* <h1 className="Content"> Hello World!</h1>  */}
      </div>
    </>
  );
}

export default App;
