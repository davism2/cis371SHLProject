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
import { doc, FieldValue, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {PlayerAttributes} from "../datatypes"

  export default function (): JSX.Element {
    
    const [playerExists,setExists] = useState("");
    const [username,setUser] = useState("");
    const [player,setPlayer] = useState({
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
    });
    let playerCopy = {...player};


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
      await setDoc(ref,player);
      }
      else{
          showMessage("To make a new Player, delete your current one.")
      }
    }
    function updateName(ev: ChangeEvent<HTMLInputElement>){
      playerCopy.name = ev.target.value;
      setPlayer(playerCopy);
      console.log(playerCopy);
      console.log(player);
    }
    function updatePoints(inc: boolean,value: number){
      let pVal = 1;
      if(inc == true){
      if(value <= 8) pVal = 1;
      else if(value <= 10) pVal = 2;
      else if(value <= 12) pVal = 5;
      else if(value <= 14) pVal = 12;
      else if(value == 15) pVal = 25;
      else if(value == 16) pVal = 30;
      else if(value == 17) pVal = 40;
      else if(value == 18) pVal = 50;
      else if(value == 19) pVal = 55;
      setPoints(points - pVal);
      }
      
      else{
        if(value <= 9) pVal = 1;
        else if(value <= 11) pVal = 2;
        else if(value <= 13) pVal = 5;
        else if(value <= 15) pVal = 12;
        else if(value == 16) pVal = 25;
        else if(value == 17) pVal = 30;
        else if(value == 18) pVal = 40;
        else if(value == 19) pVal = 50;
        else if(value == 20) pVal = 55;
        setPoints(points + pVal);
        }
    }

    function updateAttr(inc: boolean,key:string){
      let value = playerCopy[key];
      updatePoints(inc,value);
      
      if(inc == true){
        playerCopy[key]++;
        setPlayer(playerCopy);
        //setPlayer(playerDataClone);
        //playerDataClone = player;
      }
        
      else{
        playerCopy[key]--;
        setPlayer(playerCopy);
        //setPlayer(playerDataClone);
        //playerDataClone = player;  
    }
  }


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
          <div>
              <li> Amount of points: {points}</li>
            {Object.keys(player).slice(3).map(key => {
              if(key=="name")
              return (<li>{key}<input type={"text"} defaultValue="First Last" onChange={updateName}></input></li>)
              else
                return (<li>{key}&emsp;<button onClick={() => updateAttr(false,key)}>Dec</button>&emsp; {player[key]}  &emsp;<button onClick={() => updateAttr(true,key)}>Inc</button></li>)})}
            </div>
      </div>
    );  
}

