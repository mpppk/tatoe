import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import React, { Suspense } from "react"
import Meta from "app/components/Meta"
import Loading from "app/components/Loading"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Meta title="ログイン" />
      <Suspense fallback={<Loading />}>
        <LoginForm
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />
      </Suspense>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout>{page}</Layout>

export default LoginPage
