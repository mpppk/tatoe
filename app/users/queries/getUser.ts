import { NotFoundError, resolver } from "blitz"
import db from "db"
import * as z from "zod"

export default resolver.pipe(resolver.zod(z.string()), resolver.authorize(), async (userId) => {
  const user = await db.user.findFirst({
    where: { id: userId },
    include: { rankings: true },
  })

  if (!user) throw new NotFoundError()

  return user
})
