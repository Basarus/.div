import { useEffect, useState } from 'react';
import './style.css'
import * as http from '../http/userApi'
import { localUrl } from '../http';
import NavBar from './navbar';

function Question(props) {

    const [question, setQuestion] = useState('')

    async function sendQuestions() {
        await http.sendQuestions(question)
    }

    return (
        <div style={{overflow: 'hidden'}}>
            <NavBar customRouter = {props.customRouter}/>
            <div className="auth_form">
                <input id='auth_name' onChange={(event) => setQuestion(event.target.value)} className='auth_input' placeholder="Мой вопрос..."></input>
                <button onClick={() => sendQuestions()} className='auth_switch'>Отправить вопрос</button>
            </div>
        </div>
    )
}

export default Question;