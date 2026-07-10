import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaEraser } from "react-icons/fa";
import { fetchProductReservations } from "../../../api/reservationsApi";
import Pagination from "../../../components/pagination";

const ReservationIndex = ({ productId, setStatus, setShowView, setShowCreateReservation, setShowReservations, showMessage, setShowMessage }) => {

    const [token, setToken] = useState('');
    const [isLogged, setIsLoggedIn] = useState(false);
    const [productReservations, setProductReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [paginatedProductReservations, setPaginatedProductReservations] = useState([]);

    useEffect(() => {
        const isLogged = localStorage.getItem('loggedInFo');

        if (isLogged) {
            const session = JSON.parse(localStorage.getItem('loggedInFo'));

            if (session.value === true) {
                setIsLoggedIn(true);
                setToken(session.token);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, []);

    const clearProduct = () => {
        setShowView(false);
        setStatus(0);
        setShowCreateReservation(false);
        setShowReservations(false);
    }

    useEffect(() => {
        const getProductReservations = async () => {
            if (!token || token === '') {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await fetchProductReservations(token, productId);
                let pendingReservations = response.filter(item => item.status === 0);

                setProductReservations(pendingReservations);

            } catch (error) {
                console.error('Erro ao procurar reservas:', error.response.data.message);
                setProductReservations([]);
                toast.error('Erro ao carregar reservas', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        }

        getProductReservations();
    }, [productId, token, isLogged]);

    const showReservationMessage = (reservationId) => {
        setShowMessage(true);
        setSelectedReservation(reservationId);
    }

    useEffect(() => {
        if (showMessage === false) {
            setSelectedReservation(null);
        }
    }, [showMessage])


    return (
        <div className="view-product-reservations">
            <h2>Reservas do produto</h2>
            <button className="btnClearProduct" onClick={clearProduct}><FaEraser /></button>
            <div className="product-reservations">
                <table>
                    <thead>
                        <tr>
                            <th>Comercial</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                            {showMessage === false ? (<th>Ações</th>) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={showMessage === false ? 4 : 3}>A carregar dados...</td>
                            </tr>
                        ) : paginatedProductReservations.length === 0 ? (
                            <tr>
                                <td colSpan={showMessage === false ? 4 : 3}>Sem dados disponíveis</td>
                            </tr>
                        ) : (
                            showMessage === false ? (
                                paginatedProductReservations.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{new Date(item.created_at).toLocaleDateString('pt-PT')}</td>
                                        <td><button onClick={() => showReservationMessage(item.id)} className="btnSeeMessage">Ver</button></td>
                                    </tr>
                                ))
                            ) :

                                paginatedProductReservations.filter(item => item.id === selectedReservation).map((item) => (
                                    <>
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{new Date(item.created_at).toLocaleDateString('pt-PT')}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: 'left' }} colSpan={3}>Mensagem</th>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', whiteSpace: 'pre-line', wordBreak: 'break-word' }} colSpan={3}>{item.message || 'N/A'}</td>
                                        </tr>
                                        {item.variant.size ? (
                                            <>
                                                <tr>
                                                    <th style={{ textAlign: 'left' }} colSpan={3}>Tamanho</th>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word' }} colSpan={3}>{item.variant.size}</td>
                                                </tr>

                                            </>
                                        ) : null}

                                        <tr>
                                            <th style={{ textAlign: 'left' }} colSpan={3}>Cor</th>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word' }} colSpan={3}>{item.variant.color}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ textAlign: 'left' }} colSpan={3}>Orçamento</th>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word' }} colSpan={3}>{item.proposal === 1 ? 'Sim' : 'Não'}</td>
                                        </tr>
                                    </>
                                ))

                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    {showMessage === false ? (<p style={{ float: 'left' }}>A mostrar {productReservations.filter(item => item.status === 0).length} reservas...</p>) : null}
                    <Pagination items={productReservations} itemsPerPage={itemsPerPage} setPaginatedItems={setPaginatedProductReservations} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

            </div>

        </div>
    );
}

export default ReservationIndex;