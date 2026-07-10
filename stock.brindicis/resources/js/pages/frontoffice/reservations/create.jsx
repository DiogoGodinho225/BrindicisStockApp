import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaEraser } from "react-icons/fa";
import { makeReservation } from "../../../api/reservationsApi";

const CreateReservation = ({ productId, setStatus, setShowView, setShowCreateReservation, setShowReservations, refreshIndex, selectedColor, selectedSize }) => {

    const [token, setToken] = useState('');
    const [isLogged, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState({
        name: '',
        id_product: productId,
        quantity: 0,
        message: '',
        color: selectedColor,
        size: selectedSize,
        proposal: '',
        order: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevReservation) => ({
            ...prevReservation,
            [name]: value,
        }));
    };

    const createReservation = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isLogged) {
            try {
                const response = await makeReservation(token, reservation);

                if (response.status === 200 && response.data.message) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    refreshIndex();
                    setShowCreateReservation(false);
                    setShowReservations(true);
                } else {
                    toast.error(response.data.error, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Erro ao criar reserva', { autoClose: 3000 });
                console.error('Erro ao fazer reserva:', error.response.data.error || error.message);
            }
        }
        setLoading(false);
    }

    return (
        <div className="makeReservation">
            <h2>Criar Reserva</h2>
            <button className="btnClearProduct" onClick={clearProduct}><FaEraser /></button>
            {selectedColor ? <p>Cor: {selectedColor}  {selectedSize ? `| Tamanho: ${selectedSize}` : null}</p> : null}  

            <div className="form-group">
                <form onSubmit={createReservation}>
                    <div className="input-group">
                        <label htmlFor="name">Comercial:</label>
                        <input name="name" id="name" type="text" required onChange={handleInputChange}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="order">Nº Encomenda:</label>
                        <input name="order" id="order" type="text" onChange={handleInputChange}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="quantity">Quantidade:</label>
                        <input name="quantity" id="quantity" type="number" value={reservation.quantity} required onChange={handleInputChange}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="message">Mensagem:</label>
                        <textarea name="message" id="message" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" value="1" name="proposal" id="proposal" onChange={handleInputChange}></input>
                        <label htmlFor="proposal">Orçamento</label>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'A Reservar' : 'Reservar'}</button>
                </form>
            </div>
        </div>

    );
}

export default CreateReservation;