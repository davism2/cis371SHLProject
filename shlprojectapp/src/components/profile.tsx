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
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {PlayerAttributes} from "../datatypes"


  export default function (): JSX.Element {
    let playerData:PlayerAttributes = {
        id: 0,
        league: 0,
        season: 0,
        name: "",
        screening: 0,
        gettingOpen: 0,
        passing: 0,
        shootingAccuracy: 0,
        shootingRange: 0,
        offensiveRead: 0,
        checking: 0,
        hitting: 0,
        positioning: 0,
        stickchecking: 0,
        faceoffs: 0,
        defensiveRead: 0,
        agility: 0,
        balance: 0,
        speed: 0,
        stamina: 0,
        strength: 0,
        fighting: 0,
        aggression: 0,
        bravery: 0,
        determination: 0,
        leadership: 0,
        temperament: 0,
        professionalism: 0,
      };
    const [playerExists,setExists] = useState("");
    const [username,setUser] = useState("");
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
        let ref = doc(db,"PrivatePlayers",username);
        await setDoc(ref,playerData);
        }
        else{
            showMessage("To make a new Player, delete your current one.")
        }
    }



    async function testing(){
        let user = getAuth();
        let userID = user.currentUser;
        let ref = doc(db,"PrivatePlayers","1");
        const docSnap = await getDoc(ref);

        if ((await docSnap).exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    }
    
    return(
        <div className="profile">
            Welcome to your profile {username}!!
            <input type="text" placeholder="Enter your username" onChange={updateUser}/>
            <button onClick={logOut}>Log out</button>
            <button onClick={testing}> Testing DB </button>
            <button onClick={createPlayer}>Create Your Player</button> 
        </div>
    );
    
}

