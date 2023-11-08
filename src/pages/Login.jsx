import React from 'react';
import { useState } from 'react';
import './Login.css';



const Login = ({ loginFn }) => {
    const [auth, setAuth] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginFn(auth.username);
    };

    const updateState = (e) => {
        setAuth((auth) => ({ ...auth, [e.target.name]: e.target.value }));
    };

    const isValid = () => {
        return auth.username.trim() !== "" && auth.password.trim() !== "";
    };

    return (
        <div className="login">
            <div className='wrapper'>
                <h1 className='title'>TvTracker</h1>
                <form action="">
                    <h1>Se connecter</h1>
                    <div className='input-box'>
                        <input
                            type="text"
                            label="Nom d'utilisateur"
                            data-cy="fld_username"
                            id="fld_username"
                            name="username"
                            value={auth.username}
                            onChange={updateState}
                            placeholder="Nom d'utilisateur"
                        />
                        <box-icon name='user' ></box-icon>
                    </div>
                    <div className='input-box'>
                        <input
                            type="password"
                            label="Mot de passe"
                            data-cy="fld_password"
                            id="fld_password"
                            name="password"
                            value={auth.password}
                            onChange={updateState}
                            placeholder='Mot de passe'
                        />
                        <box-icon name='lock-alt' ></box-icon>
                    </div>
                    <button
                        data-cy="btn_submit"
                        className='btn'
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!isValid()}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Login;