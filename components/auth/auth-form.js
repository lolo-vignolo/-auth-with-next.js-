import { useState,  useRef } from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router"

import classes from './auth-form.module.css';


//////////

////// es para crear un nuevo usuario con fetch POST /////

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json()

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}


////////

function AuthForm() {
  
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();

  const router = useRouter()

  // puedo agregar validation 

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function handleSubmit (e) {
    e.preventDefault()

  const userEmail = inputRefEmail.current.value
  const userPassword = inputRefPassword.current.value

    if(isLogin){
        // login usuario existente, signIn viene the nextAuth
        const result = await signIn("credentials", {
          redirect : false,
          email: userEmail,
          password:userPassword
        })
        if(!result.error){
          router.replace("/profile")
        }

    }else{

      // creo nuevo
      try{
        const result = await createUser(userEmail , userPassword )
        console.log(result);

      }catch (err){
            console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={inputRefEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={inputRefPassword}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
