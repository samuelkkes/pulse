import {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    isManager: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}