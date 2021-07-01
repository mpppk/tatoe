import { useMutation, useSession } from "blitz"
import login from "app/auth/mutations/login"

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "../firebaseClient"
import React, { useEffect, useState } from "react"

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // uiCallback: (ui: firebaseui.auth.AuthUI) => {
  //   console.log('uiCallback', ui)
  // },
  callbacks: {
    signInSuccessWithAuthResult: (authResult: any, redirectUrl?: string): boolean => {
      return false
    },
  },
}

const AppFirebaseAuth: React.FC = (props) => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      ) : null}
    </div>
  )
}

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const session = useSession()

  useEffect(() => {
    if (session.userId !== null) {
      return
    }
    firebase.auth().onAuthStateChanged(async (user) => {
      const idToken = await firebase.auth().currentUser?.getIdToken()
      if (idToken && session.userId === null) {
        await loginMutation({ idToken })
        props.onSuccess?.()
      }
    })
  }, [props, session, loginMutation])

  return (
    <div>
      <h1>Login</h1>
      <AppFirebaseAuth />
    </div>
  )
}

export default LoginForm
