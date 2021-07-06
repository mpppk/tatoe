import { Routes, useMutation, useRouter } from "blitz"
import logout from "../mutations/logout"
import React, { useEffect } from "react"
import firebase from "../firebaseClient"

const LogOutPage: React.FC = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  useEffect(() => {
    const f = async () => {
      try {
        await firebase.auth().signOut()
        await logoutMutation()
      } finally {
        await router.push(Routes.Top())
      }
    }
    f()
  }, [logoutMutation, router])
  return <div>logout...</div>
}

export default LogOutPage
