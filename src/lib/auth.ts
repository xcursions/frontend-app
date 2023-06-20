// import { redirect } from "next/navigation";
// import { AxiosResponse } from 'axios';
import type { NextAuthOptions } from "next-auth";
// import { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// import { useSession } from "next-auth/react";

// import { signUp } from "@/api";

export const authConfig: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "sign in",
    //   credentials: {
    //     fullname: {
    //       label: "Full Name",
    //       type: "text",
    //       placeholder: "Full Name",
    //     },
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "@johndoe1234",
    //     },
    //     email: {
    //       label: "Email Address",
    //       type: "email",
    //       placeholder: "Email your email address",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "Password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const res = await signUp(credentials);
    //     const user = await res.json();
    //     if (res && user) {
    //       return user as User;
    //     }
    //     return null;
    //   },
    // }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
    }),
  ],
};
