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

  

  export default function NewAccount() {
    let userList = [];
    async function publicU(){
        const db = getFirestore();
        const userSnapshot = await getDocs(collection(db, "pubUsers"));
        const userList = userSnapshot.docs.map((doc)=> {
            return { id: doc.id, ...doc.data() }
          });
        console.log(userList);
    
    }
    return (
      <>
        <button onClick={publicU}></button>
        <table>
            <tr>
                <th>UserName</th>            
            </tr>
           
        </table>
        {userList.map((item,key) => <li key={item.id}>{item.id}</li>)}
        </>
    );
  }


// const db = getFirestore();
//     const querySnapshot = getDocs(collection(db, "pubUsers"));
//     return(
//         <>

//         </>
//     )