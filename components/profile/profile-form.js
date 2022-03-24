import classes from './profile-form.module.css';
import {useRef} from "react";

function ProfileForm() {

  const oPassword = useRef()
  const nPassword = useRef() 

  async function handleSubmit (event) {
    event.preventDefault()

    const oldPasswordEntered = oPassword.current.value
    const newPasswordEntered = nPassword.current.value
  
    const response = await fetch ('/api/user/change-password',{
      method : "PATCH",
      body : JSON.stringify({ 
        oldPassword : oldPasswordEntered,
        newPassword : newPasswordEntered
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data);
  }


  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={nPassword} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
