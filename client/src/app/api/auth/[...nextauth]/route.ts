import NextAuth ,{AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "@/libs/allRoutes";




export const authOptions : AuthOptions = {
    providers:[
      CredentialsProvider({
        name:'credentials',
        credentials:{
            email: {label:"email",type:'text'},
            password:{label:"password" , type:"password"}
          },
          async authorize(credentials){

if(!credentials?.email || !credentials.password){
    throw new Error('Invalid credintals')
}
console.log(credentials.email,credentials.password)

    const {email,password} = credentials
 const res = await fetch(LOGIN,{
method:'POST',
headers:{
    "content-type":"application/json"
},
body:JSON.stringify({email,password})
 })
 

 const user = await res.json()

if(res.ok && user)
return user 
else {
    return null
}





          }
      })
    ],
    pages:{
        signIn:'/signin'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(
 authOptions
)

export { handler as GET, handler as POST }