import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";

export const { handlers, auth, signOut } = NextAuth(authConfig);
