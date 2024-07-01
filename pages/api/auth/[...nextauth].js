import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/src/firebase";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(
          auth,
          credentials.email || "",
          credentials.password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      },
    }),
  ],
};

export default NextAuth(authOptions);
