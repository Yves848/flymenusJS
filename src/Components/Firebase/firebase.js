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

const categ = [
  { nom: 'Entrée / Hors d\'oeuvre'},
  { nom: 'Soupe'},
  { nom: 'Salades'},
  { nom: 'Plats principaux'},
  { nom: 'Accompagnements'},
  { nom: 'Desserts'},
  { nom: 'Collations'},
  { nom: 'Petits déjeuner'},
  { nom: 'Sandwiches'},
  { nom: 'Sauces et tempettes'},
  { nom: 'Vinaigrettes'},
  { nom: 'Boissons'},
];

export const categories = categ.map((cat,i) => {
  return {nom: cat.nom,index: i}
})

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
    this.language = navigator.language;
    this.rtl = (this.language === "ar");
    this.direction = (this.language ==="ar" ? "rtl" : "ltr")
  }

  switchRtl = () => {
    this.rtl = !this.rtl;
    this.direction = (this.rtl ? "rtl" : "ltr");
    this.language = (this.rtl ? "ar" : "fr");
    this.doDirectionChange();
  }

  getLangage = () => {
    return this.language;
  }

  doDirectionChange = () => {
    
    console.log('change' + navigator.language);
  }

  setUser = user => {
    this.User = user;
    localStorage.setItem('authUser',JSON.stringify(user));
    console.log('setUser',this.User);
  }

  getUser = () => {
    console.log("firebase.getUser", localStorage.getItem('authUser'));
    return JSON.parse(localStorage.getItem('authUser'));
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

  

  doImportCategs = () => {
    console.log('this.db',this.db);

    categories.forEach((categorie) => {
      const newCateg = this.categoriesRef().push();
      newCateg.set({nom: categorie.nom, index: categorie.index});
    })
  }

  // *** USER'S API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
  platsRef = uid => {
    //console.log('plats',uid)
    const url = `${uid}/Plats`;
    return this.db.ref(url);
  };
  categoriesRef = () => this.db.ref('categories');
}

export default Firebase;
