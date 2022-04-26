import React, { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail,
  } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {PlayerAttributes} from "../datatypes"
import { render } from "react-dom";

  export default function (): JSX.Element {
    let playerData:PlayerAttributes = {
        id: 0,
        league: 0,
        season: 0,
        name: "",
        screening: 5,
        gettingOpen: 5,
        passing: 5,
        shootingAccuracy: 5,
        shootingRange: 5,
        offensiveRead: 5,
        checking: 5,
        hitting: 5,
        positioning: 5,
        stickchecking: 5,
        faceoffs: 5,
        defensiveRead: 5,
        agility: 5,
        balance: 5,
        speed: 5,
        stamina: 5,
        strength: 5,
        fighting: 5,
        aggression: 5,
        bravery: 5,
        determination: 5,
        leadership: 5,
        temperament: 5,
        professionalism: 5,
      };
    const [playerExists,setExists] = useState("");
    const [username,setUser] = useState("");
    const [player,setPlayer] = useState(playerData);
    const [points,setPoints] = useState(1800);

    
    const db = getFirestore();
    
    const navigate = useNavigate();


    function showMessage(msg: string) {
      postMessage(msg);
  
      setTimeout(() => {
        postMessage("");
      }, 5000);
      }
    function logOut(){
      navigate(-1);
    }

    function updateUser(ev: ChangeEvent<HTMLInputElement>){
      setUser(ev.target.value);
    }

    async function createPlayer(){

      if (playerExists != `true`){
      setExists(`${true}`);
      
      let ref = doc(db,"PrivatePlayers",user.name);
      await setDoc(ref,playerData);
      }
      else{
          showMessage("To make a new Player, delete your current one.")
      }
    }
  //   function updateAttr(inc: boolean,key:string){
  //     let value = playerData[key];
  //     console.log(`before ${value}`);
  //     if(inc == true){
  //       setPlayer(playerData[key] = value + 1,() => {console.log(playerData[key]}));
  //     }
        
  //     else{
  //       setPlayer(playerData[key] = value - 1);   
  //   }
  // }


    async function testing(){
      let user = getAuth();
      let userID = user.currentUser;
      let ref = doc(db,"PrivatePlayers",user.name);
      const docSnap = await getDoc(ref);

      if ((await docSnap).exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
     //key => <li > {key}<input type="text"></input> </li>
    return(
      <div className="profile">
          Welcome to your profile {username}!!
          <div>
          <input type="text" placeholder="Enter your username" onChange={updateUser}/>
          <button onClick={logOut}>Log out</button>
          <button onClick={testing}> Testing DB </button>
          <button onClick={createPlayer}>Create Your Player</button> 
          </div>
          <span>
         
            {Object.keys(playerData).slice(3).map(key => {
              if(key=="name")
              return (<li>{key}<input type={"text"} defaultValue="First Last"></input></li>)
              else
                return (<li>{key}&emsp;<button onClick={() => setPlayer(playerData[key] = playerData[key] - 1)}>Dec</button>&emsp; {playerData[key]} &emsp;<button onClick={() => setPlayer(playerData[key] = playerData[key] - 1)}>Inc</button></li>)})}
            </span>
      </div>
    );  
}

