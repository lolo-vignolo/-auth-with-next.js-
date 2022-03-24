import { getSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import {useEffect , useState} from "react"
import { useRouter } from 'next/router';

function AuthPage() {

  const router = useRouter()

  const [loading, setLoading] = useState (true)

  useEffect(() => {

    async function gettingSession (){
      const session =  await getSession()

      if(session){
        router.replace("/")
      }else{
        setLoading(false)
      }
    }
    gettingSession()
  }, [router])
  

  if(loading){
    return <p>Loading...</p>
  }

  return <AuthForm />;
}

export default AuthPage;
