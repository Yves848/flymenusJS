import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

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
    this.storage = app.storage();
  }

  setUser = user => {
    this.User = user;
    sessionStorage.setItem('authUser',JSON.stringify(user));
    console.log('setUser',this.User);
  }

  getUser = () => {
    return JSON.parse(sessionStorage.getItem('authUser'));
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    sessionStorage.removeItem('authUser');
    this.auth.signOut();
  };

  doPasswordReset = email => {
    this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSignInWithFacebook = () => {
    const facebookProvider = new app.auth.FacebookAuthProvider();
    return this.auth.signInWithPopup(facebookProvider);
  };

  // *** USER'S API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
  platsRef = uid => {
    //console.log('plats',uid)
    const url = `${uid}/Plats`;
    return this.db.ref(url);
  };
}

export default Firebase;
