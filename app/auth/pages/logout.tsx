import { Routes, useMutation, useRouter } from "blitz"
import logout from "../mutations/logout"
import { useEffect } from "react"

const LogOutPage: React.FC = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  useEffect(() => {
    const f = async () => {
      try {
        await logoutMutation()
      } finally {
        await router.push(Routes.LoginPage())
      }
    }
    f()
  })
  return <div>logout...</div>
}

export default LogOutPage
