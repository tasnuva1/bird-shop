import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB43_p1pt4zMeiKGjLs1DidxbQkIARMAoY",
  authDomain: "authorised-db.firebaseapp.com",
  databaseURL: "https://authorised-db.firebaseio.com",
  projectId: "authorised-db",
  storageBucket: "authorised-db.appspot.com",
  messagingSenderId: "511995803126",
  appId: "1:511995803126:web:706c1bd05b37859259c3d7",
  measurementId: "G-0R44HK0FKC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
