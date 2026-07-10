import axios from "axios";

export const fetchRecentReservations = async (token) => {
    const response = await axios.get('/api/getRecentReservations', {
        params: { token: token },
    });

    if (response.data && response.data.reservations) {
        return response.data.reservations;
    }
    else {
        return [];
    }
};

export const fetchReservations = async (token) => {
    const response = await axios.get('/api/getReservations', {
        params: { token: token },
    });

    if (response.data && response.data.reservations) {
        return response.data.reservations;
    }
    else {
        return [];
    }
};

export const makeReservation = async (token, reservation) => {
    const response = await axios.post('/api/make-reservation', {
        token: token,
        name: reservation.name,
        id_product: reservation.id_product,
        quantity: reservation.quantity,
        message: reservation.message,
        size: reservation.size,
        color: reservation.color,
        proposal: reservation.proposal,
        order: reservation.order,
    });

    return response; 
};

export const approve = async (token, reservationId) => {

    const response = await axios.put('/api/approve-reservation', {
        token: token,
        id: reservationId,
    });

    return response.status;
};

/*export const disapprove = async (token, reservationId) => {
    const response = await axios.put('/api/notApprove-reservation', {
        token: token,
        id: reservationId,
    });

    return response.status;
};*/

export const deleteReservation = async (token, reservationId) => {
    const response = await axios.delete('/api/delete-reservation', {
        data: {
            token: token,
            id: reservationId
        }
    });

    return response.status;
};

export const editReservation = async (token, reservation) => {
    console.log(reservation.proposal);
    const response = await axios.put('/api/edit-reservation', {
        id: reservation.id,
        token: token,
        name: reservation.name,
        quantity: reservation.quantity,
        status: reservation.status,
        message: reservation.message,
        proposal: reservation.proposal,
        order: reservation.order
    });

    return response;
};

export const statusPending = async (token, item) => {
    const response = await axios.put('api/edit-reservation', {
        id: item.id,
        token: token,
        status: 0,
    })

    return response;
};

export const fetchProductReservations = async (token, productId) => {

    const response = await axios.get('/api/getProductReservations', {
        params: { token: token, id: productId },
    });

    if (response.status === 200 && response.data) {
        return response.data.reservations || [];
    } else {
        return [];
    }
};


export const fetchUnviewedReservations = async (token) => {
    const response = await axios.get('/api/get-unviewed-reservations', {
        params: { token: token },
    });

    if (response.status === 200 && response.data) {
        return response.data.unviewed_reservations;
    } else {
        return 0;
    }
};

export const markAsViewed = async (token) => {
    
    const response = await axios.put('/api/mark-as-viewed', {
        token: token,
    });

    return response.status;
};