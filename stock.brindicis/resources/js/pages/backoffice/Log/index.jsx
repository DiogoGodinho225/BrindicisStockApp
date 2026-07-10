import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchProductLogs } from "../../../api/LogApi";

const LogsIndex = ({ productId }) => {

    const [isLogged, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [logs, setLogs] = useState([]);

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
        if (isLogged && token) {

            const getLogs = async () => {
                setLoading(true);
                if (!token || token === '') {
                    setLoading(false);
                    return;
                }

                try {

                    const response = await fetchProductLogs(productId, token);

                    if (response.data) {
                        setLogs(response.data.logs);
                    } else {
                        setLogs([]);
                    }
                } catch (error) {
                    console.error('Erro ao procurar logs:', error.response.data.message || error.message);
                    toast.error('Erro ao carregar logs');
                    setError(error);
                }
                setLoading(false);
            };
            getLogs();
        }

    }, [productId, token, isLogged]);


    return (
        <div className="logs-container">
            <table>
                <thead>
                    <tr>
                        <th>Nota</th>
                        <th>Qnt.</th>
                        <th>Reserva</th>
                        <th>Qnt. Anterior</th>
                        <th>Qnt. Atual</th>
                        <th>Qnt. R. Anterior</th>
                        <th>Qnt. R. Atual</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8}>A carregar...</td>
                        </tr>

                    ) : error !== null ? (
                        <tr>
                            <td colSpan={8}>{error}</td>
                        </tr>
                    ) : logs.length === 0 ? (
                        <tr>
                            <td colSpan={8}>Sem dados disponíveis...</td>
                        </tr>

                    ) :

                        logs.map((log) => (
                            <tr>
                                <th>{log.message || ' '}</th>

                                <th style={{ color: log.addQuantity ? 'green' : 'red' }}>
                                    {log.addQuantity != null ? `+${log.addQuantity}` : (log.removeQuantity != null ? `-${log.removeQuantity}` : ' ')}
                                </th>

                                <th style={{ color: log.addReserved ? 'green' : 'red' }}>
                                    {log.addReserved != null ? `+${log.addReserved}` : (log.removeReserved != null ? `-${log.removeReserved}` : ' ')}
                                </th>

                                <th>{log.oldQuantity ?? ' '}</th>
                                <th>{log.newQuantity ?? ' '}</th>
                                <th>{log.oldReserved ?? ' '}</th>
                                <th>{log.newReserved ?? ' '}</th>
                                <th>{log.created_at ? new Date(log.created_at).toLocaleDateString('pt-PT') : ' '}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LogsIndex;