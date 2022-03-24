import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context){
    const session = await getSession({req : context.req})

    if(!session){
      return{
        redirect:{
                  destination: "/auth",
                  permanent:false
        }
      }
    }

    //este session no es mas que un obajeto con las cokies d ela seccion, solo se que no es undefine.

    return {
      props:{
        session
      }
    }
}

export default ProfilePage;
