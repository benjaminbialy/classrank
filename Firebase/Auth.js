import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { app, database } from "./config.js";

import { useState, useEffect } from "react";

import UserContext from "../Contexts/UserContext.js";

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const AuthService = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");
  const [picURL, setPicURL] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("You're signed in!");

        const studentsRef = doc(database, "students", uid);

        var docSnap = await getDoc(studentsRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setAuthenticated(true);
          setUID(user.uid);
          setName(user.displayName);
          setPicURL(user.photoURL);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        // User is signed out
        setAuthenticated(false);
        setUID("");
        setName("");
        setPicURL("");
        console.log("You're signed out!");
      }
    });
  }, []);

  return { uid: uid, authenticated: authenticated, name: name, picURL: picURL };
};

export const signIn = async () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      await setDoc(doc(database, "students", user.uid), {
        uid: user.uid,
        name: user.displayName,
        picURL: user.photoURL,
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
