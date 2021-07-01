import { passportAuth } from "blitz"
import { Strategy as CustomStrategy } from "passport-custom"
import firebase from "firebase-admin"
import "firebase/auth"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  secureProxy: true,
  strategies: [
    {
      strategy: new CustomStrategy(async (req, done) => {
        // console.log('headers', req.headers);
        // if (!req.query.idToken) return done(new Error("Request doesn't have idToken."))
        // const idToken = req.query.idToken as string

        try {
          // const parsedIdToken = await firebase.auth().verifyIdToken(idToken)

          // const user = await db.user.upsert({
          //   where: { id },
          //   create: { id },
          //   update: { id },
          // })

          // const publicData = { userId: user.id, roles: [user.role], source: "facebook" }
          done(null, { userId: 1 })
          // done(null, parsedIdToken)
        } catch (error) {
          console.error(error)
          done(new Error(`Facebook OAuth failed...`))
        }
      }),
    },
  ],
})
