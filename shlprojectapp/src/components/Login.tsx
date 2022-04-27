import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import logo from "../shlLogo.png";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
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
} from "firebase/firestore";

import {PlayerAttributes} from "../datatypes"

// Don't declare this variable inside the function
// Otherwise, it will get reset every render
let auth: Auth | null;

export default function (): JSX.Element {
  const [u_email, setEmail] = useState("");
  const [u_pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  let playerData: PlayerAttributes;
  const navigate = useNavigate();


  useEffect(() => {
    auth = getAuth();
    console.log("Auth is initialized", auth);
  }, []);

  function updateEmail(ev: ChangeEvent<HTMLInputElement>) {
    setEmail(ev.target.value);
  }
  function updatePass(ev: ChangeEvent<HTMLInputElement>) {
    setPass(ev.target.value);
  }
  function resetPass(): void {
    sendPasswordResetEmail(auth!, u_email)
      .then(() => {
        showMessage(`A password reset link has been sent to ${u_email}`);
      })
      .catch((err: any) => {
        showMessage(`Unable to reset password ${err}`);
      });
  }

  function withEmail() {
    signInWithEmailAndPassword(auth!, u_email, u_pass)
      .then(async (cr: UserCredential) => {
        if (cr.user.emailVerified) navigate("/profile");
        else {
          showMessage("You must first verify your email");
          await signOut(auth!);
        }
      })
      .catch((err: any) => {
        showMessage(`Unable to login ${err}`);
      });
  }

  function createAccount() {
    createUserWithEmailAndPassword(auth!, u_email, u_pass)
    .then(async (cr: UserCredential) => {
        await sendEmailVerification(cr.user);
        showMessage(`Verification email sent to  ${u_email}`)
    })
    .catch((err: any) => {
        alert(`Unable to create account ${err}`);
      })};


  function showMessage(msg: string) {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <>
      <section>
      <img src={logo}/>
        <div id="loginpanel">
          <input
            type="text"
            placeholder="Enter your email"
            onChange={updateEmail}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={updatePass}
          />
          <div id="loginByEmail">
            <button onClick={createAccount}>Signup</button>
            <button onClick={resetPass}>Reset Password</button>
            <button onClick={withEmail}>Login</button>
          </div>
        </div>
      </section>
      <span id="msgbox">{message}</span>
    </>
  );
}