import { useEffect, useState } from 'react';
import './style.css'
import * as http from '../http/userApi'
import { localUrl } from '../http';

function Authorization (props) {
  const [registration, setRegistration] = useState(false)
  const [authShow, setAuthShow] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

   useEffect(() => {
      if (!localStorage.getItem('token')) setAuthShow(true)
    else {
      setAuthShow(false)
      if (localStorage.getItem('roles') == 'Пользователь') props.customRouter('question')
      else if (localStorage.getItem('roles') == 'Администратор') props.customRouter('answers') 
    }
   })

   async function tryAuth() {
    let response = null;
    if (registration) response = await http.registration(name, email, password)
    else response = await http.login(email, password)
    if (response) {
      localStorage.setItem('token', 'Bearer ' + response.data.token)
      localStorage.setItem('roles', response.data.role[response.data.role.length - 1].name)
      setAuthShow(true)
      if (localStorage.getItem('roles') == 'Пользователь') props.customRouter('question')
      else if (localStorage.getItem('roles') == 'Администратор') props.customRouter('answers') 
    }
   }

  return (
   authShow ? <div>
       <div className="auth_form">
       {registration ? <input id='auth_name' onChange={(event) => setName(event.target.value)} className='auth_input' placeholder="Name"></input> : ''}
        <input id='auth_email' onChange={(event) => setEmail(event.target.value)} className='auth_input' placeholder="Email"></input>
        <input id='auth_password' onChange={(event) => setPassword(event.target.value)} className='auth_input' placeholder="Password"></input>
        <button onClick={() => tryAuth()} className='auth_button'>{registration ? 'Зарегистрироваться' : 'Авторизоваться'}</button>
        <button onClick={() => setRegistration(!registration)} className='auth_switch'>{registration ? 'Войти' : 'Зарегистрироваться'}</button>
       </div>
    </div> : <div>
         
    </div>
  )
}

export default Authorization;