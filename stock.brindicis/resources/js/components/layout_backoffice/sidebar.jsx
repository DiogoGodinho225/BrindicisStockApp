import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaSignInAlt, FaBox, FaTag, FaWarehouse, FaCalendar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { fetchUnviewedReservations, markAsViewed } from '../../api/reservationsApi';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ updateStock, getRecentReservations, updateIndex }) => {
    const location = useLocation();
    const [UnviewedReservations, setUnviewedReservations] = useState(Number(sessionStorage.getItem('unviewedReservations')) || 0);
    const [token, setToken] = useState('');
    const [isLogged, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isLogged = localStorage.getItem('loggedInBo');

        if (isLogged) {
            const session = JSON.parse(localStorage.getItem('loggedInBo'));

            if (session.value === true) {
                setIsLoggedIn(true);
                setToken(session.token);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, []);

    useEffect(() => {
        const getUnviewedReservations = async () => {
            if (!token) return;

            const old_unviewed = Number(sessionStorage.getItem('unviewedReservations')) || 0;

            try {
                const response = await fetchUnviewedReservations(token);

                setUnviewedReservations(response);
                sessionStorage.setItem('unviewedReservations', response);

                if (response !== 0 && response !== old_unviewed) {

                    toast.info('A atualizar dados...', {
                        autoClose: 3000,
                        hideProgressBar: true,
                        pauseOnHover: false,
                        draggable: false,
                        closeOnClick: true,
                        className: 'small-toast',
                        bodyClassName: 'small-toast-body'

                    });

                    updateStock?.();
                    getRecentReservations?.();
                    updateIndex?.();
                    console.log('Reservas não vistas atualizadas:', response);
                } else {
                    console.log('Sem reservas por ver');
                }
            } catch (error) {
                console.error('Erro ao procurar reservas não lidas:', error.response.data.message || error.message);
                setUnviewedReservations(0);
                sessionStorage.setItem('unviewedReservations', 0);
            }
        };

        getUnviewedReservations();
        const interval = setInterval(getUnviewedReservations, 2000);
        return () => clearInterval(interval);
    }, [token, isLogged]);

    const markReservationsAsViewed = async () => {
        if (!token) return;

        try {
            const response = await markAsViewed(token);
            if (response === 200) {
                setUnviewedReservations(0);
                sessionStorage.setItem('unviewedReservations', 0);
            }
        } catch (error) {
            console.error('Erro ao marcar como vistas:', error.response.data.message || error.message);
            setUnviewedReservations(0);
            sessionStorage.setItem('unviewedReservations', 0);
        }
    };

    useEffect(() => {
        if (location.pathname === '/reservations' && UnviewedReservations > 0) {
            markReservationsAsViewed();
        }
    }, [location.pathname, UnviewedReservations]);

    const isInventoryActive = location.pathname.startsWith('/inventory') ||
        location.pathname.startsWith('/create-product') ||
        location.pathname.startsWith('/edit-product');

    return (
        <div className="sidebar-container bg-body-white">

            <span className="sidebar-header">Navegação</span>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                        <FaTachometerAlt className="me-2" /> Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/inventory" className={() => isInventoryActive ? "nav-link active" : "nav-link"} activeClassName="active">
                        <FaWarehouse className="me-2" /> Stock
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={markReservationsAsViewed} to="/reservations" className="nav-link" activeClassName="active">
                        <FaCalendar className="me-2" /> Reservas {UnviewedReservations > 0 && location.pathname !== '/reservations' && (
                            <span>{UnviewedReservations}</span>
                        )}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/categories" className="nav-link" activeClassName="active">
                        <FaTag className="me-2" /> Fornecedores
                    </NavLink>
                </li>
                <hr />
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" activeClassName="active">
                        <FaSignInAlt className="me-2" /> Página Principal
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
