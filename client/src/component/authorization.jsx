import { useEffect, useState } from 'react';
import './style.css'

function Authorization () {
  const [registration, setRegistration] = useState(false)
  const [authShow, setAuthShow] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

   useEffect(() => {
    if (!localStorage.getItem('token')) setAuthShow(true)
    else setAuthShow(false)
   })

   function tryAuth() {
    console.log(email)
   }
 

  return (
    <div>
       <div className="auth_form">
       {registration ? <input id='auth_name' className='auth_input' placeholder="Name"></input> : ''}
        <input id='auth_email' onChange={(event) => setEmail(event.nativeEvent.data)} className='auth_input' placeholder="Email"></input>
        <input id='auth_password' className='auth_input' placeholder="Password"></input>
        <button onClick={() => tryAuth()} className='auth_button'>{registration ? 'Зарегистрироваться' : 'Авторизоваться'}</button>
        <button onClick={() => setRegistration(!registration)} className='auth_switch'>{registration ? 'Войти' : 'Зарегистрироваться'}</button>
       </div>
    </div>
  )
}

export default Authorization;