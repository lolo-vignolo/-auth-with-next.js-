import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPasword } from "../../../helper/auth";
import { connectToDatabase } from "../../../helper/db";

export default NextAuth({

    // establezco los token

    session: {
        jwt:true
    },

    // Configure one or more authentication providers
    providers: [
        
        CredentialsProvider({

            //estos credential vendrán del form Login
           async authorize (credentials , req) {

            //conecto la base de datos y filtro por email
                const client = await connectToDatabase()
                const userCollection = client.db().collection("users")
                const userIsLogin = await userCollection.findOne({email:credentials.email})
                
                if(!userIsLogin){
                    client.close()  
                    throw new Error("You must create an user")
                }

                // si pasa este control que existe, debo ver si la password coincide, pero deno unhash la
                //pasword, ir a la carpeta helper/auth, donde utilizo compare

                const userLoged = await verifyPasword(credentials.password, userIsLogin.password)
                
                if(!userLoged){
                    throw Error("Email or Password incorrect!")
                }
                client.close()

                //importante retornar el email, para luego poder extraerlo del Token
                return {
                    email: userIsLogin.email
                }
           }
        })
      // ...add more providers here
    ],
  })