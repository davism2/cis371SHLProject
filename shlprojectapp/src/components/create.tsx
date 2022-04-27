import {
    Auth,
    getAuth,
    createUserWithEmailAndPassword,
    UserCredential,
    sendEmailVerification,
  } from "firebase/auth";
  import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    Firestore,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  
  import { ChangeEvent, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  let auth: Auth;
  import * as React from "react";
  const playerData = {
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
  };


  export default function NewAccount() {
    const db = getFirestore();
    const navigate = useNavigate();
    const [u_email, setEmail] = useState("");
    const [u_pass1, setPass1] = useState("");
    const [u_pass2, setPass2] = useState("");
    const [username, setUser] = useState("");
    const folderInput= React.useRef(null);
    useEffect(() => {
      auth = getAuth();
    }, []);
  
    function updateEmail(ev: ChangeEvent<HTMLInputElement>) {
      setEmail(ev.target.value);
    }
    function updatePass1(ev: ChangeEvent<HTMLInputElement>) {
      setPass1(ev.target.value);
    }
    function updatePass2(ev: ChangeEvent<HTMLInputElement>) {
      setPass2(ev.target.value);
    }
  
    function toMain() {
      if (u_pass1 === u_pass2) {
        createUserWithEmailAndPassword(auth!, u_email, u_pass1)
          .then(async (cr: UserCredential) => {
            let Privref = doc(db,"PrivatePlayers",`${auth?.currentUser?.uid}`);
            let points = 200 + (Math.random() * (1800-200));
            setDoc(Privref,playerData);
            updateDoc(Privref,{points});
            let Pubref = doc(db,"pubUsers",`${username}`);
            setDoc(Pubref,{points});
            await sendEmailVerification(cr.user);
            navigate("/profile", { replace: true });
          })
          .catch((err: any) => {
            alert(`Unable to create account ${err}`);
          });
      } else {
        alert("Passwords do not match");
      }
    }
    function updateUName(ev: ChangeEvent<HTMLInputElement>){
        setUser(ev.target.value);
    }
    return (
      <>
        <section>
          <input type="text" placeholder="Email" onChange={updateEmail}></input>
          <input type="text" placeholder="Username" onChange={updateUName}></input>
          <input
            type="password"
            placeholder="Password"
            onChange={updatePass1}
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={updatePass2}
          ></input>
          <input type="file"  className="form-control" ref={folderInput} />
        </section>
        <div>
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button onClick={toMain}>Create & Login</button>
        </div>
      </>
    );
  }