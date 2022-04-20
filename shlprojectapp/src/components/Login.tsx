import React, { Component } from "react";
import logo from "../shlLogo.png";

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


class LogInPage extends React.Component<any,any>{

    constructor(props){
        super(props);
        this.state ={
            username: "user",
            password: "password",
        }
        this.createAccount = this.createAccount.bind(this);
        this.withEmail = this.withEmail.bind(this);
        
    }

    
    message = "";
    auth: Auth = getAuth();
    emailVerification = false;
    get isValidInput(): boolean {
        return this.state.username.length > 0 &&  this.state.password.length > 0;
    }
    
    showMessage(txt: string) {
        this.message = txt;
        // The message will automatically disappear after 5 seconds
        setTimeout(() => {
        this.message = "";
        }, 5000);
    }
    createAccount(): void {
        createUserWithEmailAndPassword(this.auth!, this.state.username, this.state.password)
        .then(async (cr: UserCredential) => {
            if (this.emailVerification) {
            await sendEmailVerification(cr.user);
            await signOut(this.auth!);
            console.log(
                "An email verification has been sent to " + cr.user.email
            );
            } else console.log(`New account created with UID ${cr.user.uid}`);
        })
        .catch((err: any) => {
            console.log(`Unable to create account ${err}`);
        });
    }
    resetPass(): void {
        sendPasswordResetEmail(this.auth!, this.state.username)
        .then(() => {
            this.showMessage(
            `A password reset link has been sent to ${this.state.username}`
            );
        })
        .catch((err: any) => {
            this.showMessage(`Unable to reset password ${err}`);
        });
    }
    

    

    withEmail(): void {
        signInWithEmailAndPassword(this.auth!, this.state.username, this.state.password)
        .then(async (cr: UserCredential) => {
            if (cr.user.emailVerified)
            console.log("congrats you are logged in")
            else {
            console.log("You must first verify your email");
            await signOut(this.auth!);
            }
        })
        .catch((err: any) => {
            console.log(`Unable to login ${err}`);
        });
    }
 
    render(){
        return (
            <div className="LogIn">
                <img src={logo}/>
                <div>
                    <header><input type={"text"} name="username" placeholder="user"   onChange={ e => this.setState({username: e.target.value}) } /></header>
                    <header><input type={"password"} name="password" placeholder="pass" onChange={ e => this.setState({password: e.target.value})} /></header>
                    <header><button onClick={this.withEmail}>Log In </button></header>
                    <header><button onClick={this.createAccount}>Sign Up </button></header>
                </div>
            </div>
        );
    }
}



export default(LogInPage);