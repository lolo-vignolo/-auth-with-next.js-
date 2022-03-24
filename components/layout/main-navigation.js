import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

import classes from './main-navigation.module.css';

function MainNavigation() {
  
  //este useSession manda una consulta a un endpoint de donde obtiene si estamos o no auth
  const { data: session, status } = useSession();
  console.log(session)
  console.log(status);

  const handleLogout = () =>{
    // limpia toda la info, hasta los cockis para que no quede la seción abierta
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          )}

          {session &&(
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          )}

          {session && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
