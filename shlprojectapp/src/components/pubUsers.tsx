import { async } from "@firebase/util";
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
    getDocs,
    getFirestore,
    QuerySnapshot,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
import { useEffect, useState } from "react";

  

  export default function NewAccount() {
    const [userList,setUsers] = useState([]);
    
    useEffect(() => {
      console.log("Mounting Dom!");
      publicU();
    }, []);


    async function publicU(){
        const db = getFirestore();
        const userSnapshot = await getDocs(collection(db, "pubUsers"));
        let userListC = userSnapshot.docs.map((doc)=> {
            return { id: doc.id, ...doc.data() }
          })
        setUsers(userListC);
        console.log(userList);
        userList.map((item) => {console.log(item.id)})
    }

    //let component = userList.map((item) => {console.log(item.id)})
    return (
      <>
        
        
        <table>
          <thead>
            <tr>
                <th>UserName</th>  
                <th>Points</th>          
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => {return(<tr><td>{item.id}</td><td>{item.points}</td></tr>)})}
          </tbody>
        </table>
        
        </>
    );
  }


// const db = getFirestore();
//     const querySnapshot = getDocs(collection(db, "pubUsers"));
//     return(
//         <>
//return (<tr><td>{item.id}</td><td>{item.points}</td></tr>)
//         </>
//     )