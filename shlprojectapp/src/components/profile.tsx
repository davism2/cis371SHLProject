import React, { Component } from "react";
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

  export default function (): JSX.Element {
    const navigate = useNavigate();

    function logOut(){
        navigate(-1);
    }
    
    return(
        <div className="profile">
            Welcome to your profile!!
            <button onClick={logOut}>Log out</button>
        </div>
    );
    
}

