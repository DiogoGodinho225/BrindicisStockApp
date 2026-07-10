import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
       
        const loggedInBO = localStorage.getItem('loggedInBo');

        if (!loggedInBO) {
            navigate('/stock');
        }else{
            const interval = setInterval(() =>{
                sessionStorage.setItem('local', 'bo');
            }, 50)
            return () => clearInterval(interval);
        }

    }, [navigate]);

    return children;
}

export default PrivateRoute;
