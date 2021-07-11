import { resolver } from "blitz"
import db from "db"
import { Login } from "../validations"
import admin from "../firebaseAdminClient"

export const authenticateUser = async (idToken: string) => {
  const decodedIdToken = await admin.auth().verifyIdToken(idToken)
  let user = await db.user.findFirst({ where: { id: decodedIdToken.uid } })
  if (!user) {
    user = await db.user.create({
      data: {
        id: decodedIdToken.uid,
        name: decodedIdToken.name,
        pictureUrl: decodedIdToken.picture,
      },
    })
  }
  return user
}

export default resolver.pipe(resolver.zod(Login), async (data, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(data.idToken)

  await ctx.session.$create({
    userId: user.id,
    role: "USER",
    name: user.name,
    pictureUrl: user.pictureUrl,
  })

  return user
})
