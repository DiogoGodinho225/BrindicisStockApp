import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
       
        const loggedInFO = localStorage.getItem('loggedInFo');
    
        if (!loggedInFO) {
            navigate('/');
        }else{
            const interval = setInterval(()=>{
                sessionStorage.setItem('local', 'fo');
            },50)
            return () => clearInterval(interval);
        }

    }, [navigate]);

    return children;
}

export default PrivateRoute;
