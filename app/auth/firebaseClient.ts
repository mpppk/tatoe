import firebase from "firebase/app"
// 必要に応じて追加する
import "firebase/auth"

if (typeof window !== "undefined" && !firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyCurYBAUC07pg-MmeWQ1_pXrhXV7d9ksJk",
    authDomain: "tatoe-app.firebaseapp.com",
    projectId: "tatoe-app",
    storageBucket: "tatoe-app.appspot.com",
    messagingSenderId: "378979052227",
    appId: "1:378979052227:web:cd0db1851e80a0397ad076",
    measurementId: "G-DZDWHH332E",
  }
  firebase.initializeApp(config)
}

export default firebase
