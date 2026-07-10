import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkExpiration, setSessionExpiration } from '../../components/utils/verifySession';
import { loginFrontOffice } from '../../api/authApi';

const LoginFrontOffice = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInFO = localStorage.getItem('loggedInFo');
        const bo = sessionStorage.getItem('local');
        if(bo){
            sessionStorage.removeItem('local');
        }
        
        if (loggedInFO) {
            if (checkExpiration('loggedInFo')) {
                localStorage.removeItem('loggedInFo');
                sessionStorage.removeItem('local');
                toast.error('Sessão expirada', { autoClose: 5000 });
            } else {
                sessionStorage.setItem('local', 'fo');
                navigate('/index');
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginFrontOffice(username, password);

            if (response.status === 200 && response.data.logged_in === true) {
                setSessionExpiration('loggedInFo', true, response.data.token);
                sessionStorage.setItem('local', 'fo');
                navigate('/index');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro. Tente novamente.');
            }
            console.error('Erro no Login:', error.response.data.message || error.message);
        }
    };

    return (
        <div className={`login-container`}>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="login-box">
                <ToastContainer />
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Introduza o username..."
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Introduza a password..."
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginFrontOffice;
