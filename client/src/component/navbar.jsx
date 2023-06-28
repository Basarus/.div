import { useEffect, useState } from 'react';
import './style.css'
import * as http from '../http/userApi'
import { localUrl } from '../http';

function NavBar(props) {

    function loadButton() {
        let role = localStorage.getItem('roles');
        let button = [];
        if (role == 'Пользователь') button.push('Задать вопрос');
        if (role == 'Администратор') button.push('Получить вопросы');
        button.push('Выйти')
        return button.map((e, i) => <button key={i} onClick={pressButton.bind(this, e)}>{e}</button>)
    }

    function pressButton(e) {
        if (e == 'Выйти') {
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            return props.customRouter('auth')
        }
        if (e == 'Задать вопрос') props.customRouter('question')

    }

    return (
        <div className="navbar">
            {loadButton()}
        </div>
    )
}

export default NavBar;