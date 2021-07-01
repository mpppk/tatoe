import admin from "firebase-admin"

// 必要に応じて追加する
import "firebase/auth"
// import { config } from "../firebaseConfig"

if (typeof window === "undefined" && !admin.apps.length) {
  admin.initializeApp()
}

export default admin
