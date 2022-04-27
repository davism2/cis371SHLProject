import React, { ChangeEvent, Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {deleteUser,
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail,
  } from "firebase/auth";
import { deleteDoc, doc, FieldValue, Firestore, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import {PlayerAttributes} from "../datatypes"

export default function (): JSX.Element {
    
  const [playerShow,setShow] = useState(false);
  const [username,setUser] = useState("");
  const [player,setPlayer] = useState({
    id: 0,
    league: 0,
    season: 0,
    name: "first last",
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
  let auth: Auth | null = getAuth();
  let userID = auth?.currentUser?.uid;

  const [points,setPoints] = useState(1800);
  
  const db = getFirestore();
  let ref = doc(db,"PrivatePlayers",`${auth?.currentUser?.uid}`);
  const navigate = useNavigate();


  function showMessage(msg: string) {
    postMessage(msg);

    setTimeout(() => {
      postMessage("");
    }, 5000);
  }


  function logOut(){
    signOut(auth).then(() => {
      showMessage(`Signed out`);
    }).catch((error) => {
      console.log("did not sign out");
    });
    navigate(-1);
  }

  function updateUser(ev: ChangeEvent<HTMLInputElement>){
    setUser(ev.target.value);
  }
  function updateName1(ev: ChangeEvent<HTMLInputElement>){
    playerCopy.name = ev.target.value;
    setPlayer(playerCopy);
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
    if(value ==5 && inc == false){showMessage(`Cannot set attribute below 5`); return}
    if(value ==20 && inc == true){showMessage(`Cannot set attribute above 20`);return}
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


  async function showPlayer(){
    console.log(userID);
    setShow(true);
    let docSnap = await getDoc(ref);
    
    if (docSnap.exists()) {
      let data = docSnap.data();
      Object.keys(playerCopy).map(key => {playerCopy[key] = data[key]});
      setPlayer(playerCopy);
      console.log(playerCopy);
      console.log(player);
      setPoints(data.point);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  async function savePlayer(){
    let docSnap = await getDoc(ref);
    if (docSnap.exists()) {
    updateDoc(ref,player);
    updateDoc(ref,{point:points});
    }
  }
  function deleteAcc(){
    if(auth != null){
      deleteUser(auth.currentUser).then(() => console.log('user deleted'));
      deleteDoc(ref);
      navigate(-1);
    }
  }

  let component;
  if(!playerShow){
    component=<button onClick={showPlayer}> Show Character </button>
  }
  else{
    
    component =[<li> Amount of points: {points}</li>,<header>
        {Object.keys(player).slice(3).map(key => {
        if(key=="name")
        return (<li>{key}<input type={"text"} value={player.name} onChange={updateName1}></input></li>)
        else
          return (<li>{key}&emsp;<button onClick={() => updateAttr(false,key)}>Dec</button>&emsp; {player[key]}  &emsp;<button onClick={() => updateAttr(true,key)}>Inc</button></li>)})}</header>,<button onClick={savePlayer} > Save Player </button>]
  }


  

  return(
    <div className="profile">
      Welcome to your profile {username}!!
      <div>
      <input type="text" placeholder="Enter your username" onChange={updateUser}/>
      <button onClick={logOut}>Log out</button>
      <button onClick={deleteAcc}>Delete Account</button>
      </div>
      <div>
        {component}
      </div>
    </div>
  );  
}


