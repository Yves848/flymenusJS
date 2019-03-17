import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email,password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = email => {
    this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSignInWithFacebook = () => {
    const facebookProvider = new app.auth.FacebookAuthProvider()
    return this.auth.signInWithPopup(facebookProvider);
  }

  // *** USER'S API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;
