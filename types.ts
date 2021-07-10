import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

export type User = {
  id: string
  name: string
  pictureUrl: string | null
}

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      name: User["name"]
      pictureUrl: User["pictureUrl"]
      role: Role
    }
  }
}
