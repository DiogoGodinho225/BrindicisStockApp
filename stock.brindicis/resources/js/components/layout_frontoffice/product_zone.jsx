import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ViewProduct from "../../pages/frontoffice/products/view";
import CreateReservation from "../../pages/frontoffice/reservations/create";
import ReservationIndex from "../../pages/frontoffice/reservations/index";

const ProductZone = ({
    productId,
    showView,
    setShowView,
    showCreateReservation,
    setShowCreateReservation,
    showReservations,
    setShowReservations,
    setStatus,
    refreshIndex,
    showMessage,
    setShowMessage,
}) => {

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const reservationsIndex = () => {
        setShowReservations(true);
        setShowView(false);
        setShowCreateReservation(false);
        setStatus(1);
        setSelectedColor(null);
        setSelectedSize(null);
    };

    const reservationsCreate = () => {
        setShowReservations(false);
        setShowView(false);
        setShowCreateReservation(true);
        setStatus(1);
    };

    const productView = () => {
        setShowCreateReservation(false);
        setShowView(true);
        setShowReservations(false);
        setStatus(1);
        setSelectedColor(null);
        setSelectedSize(null);
    }

    const closeMessage = () => {
        setShowMessage(false);
    }

    return (
        <div className="product-zone-container">
            {showView ? (
                <>
                    <ViewProduct
                        productId={productId}
                        setShowView={setShowView}
                        setStatus={setStatus}
                        setShowCreateReservation={setShowCreateReservation}
                        setShowReservations={setShowReservations}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                    {productId ? (
                        <div className="view-btns">
                            <button onClick={reservationsIndex}>Ver Reservas</button>
                            <button onClick={reservationsCreate}>Adicionar Reserva</button>
                        </div>
                    ) : null}
                </>
            ) : showCreateReservation ? (
                <>
                    <CreateReservation
                        productId={productId}
                        setShowView={setShowView}
                        setStatus={setStatus}
                        setShowCreateReservation={setShowCreateReservation}
                        setShowReservations={setShowReservations}
                        refreshIndex={refreshIndex}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                         />
                    <div className="view-btns">
                        <button onClick={productView}>Voltar</button>
                    </div>
                    <small style={{ color: '#d32f2f', fontSize: '0.85rem', marginLeft: 'auto' }}>
                        * As reservas são válidas por 48 horas.
                    </small>
                </>
            ) : showReservations ? (
                <>
                    <ReservationIndex
                        productId={productId}
                        setShowView={setShowView}
                        setStatus={setStatus}
                        setShowCreateReservation={setShowCreateReservation}
                        setShowReservations={setShowReservations}
                        showMessage={showMessage}
                        setShowMessage={setShowMessage}
                    />
                    {productId ? (
                        <>
                            <div className="view-btns">
                                <button onClick={showMessage === true ? closeMessage : productView}>
                                    Voltar
                                </button>
                                <button onClick={reservationsCreate}>Adicionar Reserva</button>
                            </div>
                            <small style={{ color: '#d32f2f', fontSize: '0.85rem', marginLeft: 'auto' }}>
                                * As reservas são válidas por 48 horas.
                            </small>
                        </>
                    ) : null}
                </>
            ) : (
                <p className="result-alert">Selecione um produto...</p>
            )}
        </div>
    );
}

export default ProductZone;