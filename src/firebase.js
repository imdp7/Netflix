import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtbn-9ucus0wIQTPbXkEVp_erxFDIoKjk",
  authDomain: "netflix-90293.firebaseapp.com",
  databaseURL: "https://netflix-90293.firebaseio.com",
  projectId: "netflix-90293",
  storageBucket: "netflix-90293.appspot.com",
  messagingSenderId: "600811668823",
  appId: "1:600811668823:web:caede26ec65f61025f2a12",
  measurementId: "G-95T53P83LV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore({ experimentalForceLongPolling: true });

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    history.push('/home')
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, FirstName,LastName } = user;
    try {
      await userRef.set({
        FirstName,
        LastName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
  
};

export const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email)
    .then(() => {
      alert.message("Success")
    })
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  auth.signOut()
  .then((response) => {
    history.push("/")
  })
  .catch(error => {
    toast.error("Error Logging out", error);
  });
};


export { db };