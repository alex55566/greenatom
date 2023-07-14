import React, { useState } from 'react';
import classes from '../styles/components/Autorization.module.css'
import { useNavigate } from 'react-router-dom'

export function AutorizationPage() {

    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [alert, setAlert] = useState(false);

    function checkValidation() {
        login.length < 2 || password.length < 2 ? setAlert(true) : navigate('/articles')
    }

    return (
        <div className="wrapper">
            <h1>Переход к SWAPI</h1>
            <div className={classes.login}>
                <div className={classes.title}>Логин</div>
                <input placeholder="Логин" onChange={(e) => { setLogin(e.target.value); setAlert(false) }} value={login} className="input" type="text" />
            </div>
            <div className={classes.password}>
                <div className={classes.title}>Пароль</div>
                <input placeholder="Пароль" onChange={(e) => { setPassword(e.target.value); setAlert(false) }} value={password} className="input" type="text" />
            </div>

            <button className="btn" onClick={checkValidation}>Открыть</button>

            {alert &&
                <div className={classes.alert}>Логин и пароль должны содержать не менее двух символов</div>
            }
        </div>
    )
}