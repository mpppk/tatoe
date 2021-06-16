import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import admin from "firebase-admin"

// export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
//   const email = rawEmail.toLowerCase().trim()
//   const password = rawPassword.trim()
//   const user = await db.user.findFirst({ where: { email } })
//   if (!user) throw new AuthenticationError()
//
//   const result = await SecurePassword.verify(user.hashedPassword, password)
//
//   if (result === SecurePassword.VALID_NEEDS_REHASH) {
//     // Upgrade hashed password with a more secure hash
//     const improvedHash = await SecurePassword.hash(password)
//     await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
//   }
//
//   const { hashedPassword, ...rest } = user
//   return rest
// }

export const authenticateUser = async (idToken: string) => {
  // const email = rawEmail.toLowerCase().trim()
  // const password = rawPassword.trim()
  const decodedIdToken = await admin.auth().verifyIdToken(idToken)
  console.log("token", decodedIdToken)
  let user = await db.user.findFirst({ where: { id: decodedIdToken.uid } })
  if (!user) {
    user = await db.user.create({ data: { id: decodedIdToken.uid, name: decodedIdToken.aud } })
  }
  return user

  // const { hashedPassword, ...rest } = user
  // return rest
}

export default resolver.pipe(resolver.zod(Login), async (data, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(data.idToken)

  await ctx.session.$create({ userId: user.id })

  return user
})
