import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/layout_backoffice/layout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUndo, FaCheckCircle, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { fetchReservations, approve, deleteReservation, editReservation, statusPending } from '../../../api/reservationsApi';
import Pagination from '../../../components/pagination';

const ReservationsIndex = () => {
    const [isLogged, setIsLoggedIn] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [reservation, setReservation] = useState(null);
    const [paginatedReservations, setPaginatedReservations] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

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

    const getTableData = async () => {
        setLoading(true);
        try {
            const response = await fetchReservations(token);

            setReservations(response);
            setFilteredReservations(response);

        } catch (error) {
            setError('Erro ao ir buscar as reservas.');
            console.error('Erro ao procurar reservas:', error.response.data.message || error.message);
            toast.error('Erro ao ir procurar as reservas.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLogged) {
            getTableData();
        }
    }, [isLogged]);

    const handleSearchItem = (newSearchItem) => {
        setSearchItem(newSearchItem);
    };

    useEffect(() => {
        setCurrentPage(1);
        if (searchItem === '') {
            const filtered = reservations.filter((reservation) => reservation.status === selectedStatus);
            setFilteredReservations(filtered);
        } else {
            const filtered = reservations.filter((reservation) =>
                reservation.name.toLowerCase().includes(searchItem.toLowerCase()) && reservation.status === selectedStatus ||
                reservation.ref.toLowerCase().includes(searchItem.toLowerCase()) && reservation.status === selectedStatus ||
                reservation.variant.color.toLowerCase().includes(searchItem.toLowerCase()) ||
                reservation.variant.size.toLowerCase().includes(searchItem.toLowerCase()) ||
                String(reservation.quantity).includes(searchItem) && reservation.status === selectedStatus
            );
            setFilteredReservations(filtered);
        }
    }, [searchItem, reservations]);

    const approveReservation = async (reservationId) => {

        try {

            const response = await approve(token, reservationId);

            if (response === 200) {
                toast.success('Reserva aprovada!', { autoClose: 3000 });
                getTableData();
            } else {
                toast.error('Erro ao aprovar reserva!', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Erro ao tentar aprovar a reserva!', { autoClose: 3000 });
            console.error('Erro ao aprovar reserva:', error.response.data.message || error.message);
        }
    };

    /*const disapproveReservation = async (reservationId) => {

        try {

            const response = await disapprove(token, reservationId);

            if (response === 200) {
                toast.success('Reserva reprovada!', { autoClose: 3000 });
                getTableData();
            } else {
                toast.error('Erro ao reprovar reserva!', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Erro ao tentar reprovar a reserva!', { autoClose: 3000 });
            console.error('Erro ao reprovar reserva:', error.response.data.message || error.message);
        }
    };*/

    useEffect(() => {
        setCurrentPage(1);
        const filtered = reservations.filter((reservation) => reservation.status === selectedStatus);

        setFilteredReservations(filtered);

    }, [selectedStatus, reservations])


    const handleDelete = async (reservationId) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja eliminar esta reserva?');

        if (confirmDelete) {
            try {

                const response = await deleteReservation(token, reservationId);

                if (response === 200) {
                    toast.success('Reserva deletada com sucesso!', { autoClose: 3000 });
                    getTableData();
                } else {
                    toast.error('Erro ao deletar a reserva!', { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Erro ao tentar deletar uma reserva!', { autoClose: 3000 });
                console.error('Erro ao deletar reserva:', error.response.data.message || error.message);
            }
        } else {
            toast.info('Exclusão cancelada.', { autoClose: 2000 });
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        setReservation((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const openModal = (item) => {
        setShowModal(true);
        setReservation(item);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLogged) {
            try {

                if (reservation.quantity == 0) {
                    toast.error('Adicione uma quantidada à reserva', { autoClose: 3000 });
                    return;
                }

                const response = await editReservation(token, reservation);

                if (response.status === 200 && response.data.message) {
                    toast.success('Reserva editada com sucesso!', { autoClose: 3000 });
                    setShowModal(false);
                    if(!showMessage){
                        setReservation(null);
                    }
                    getTableData();
                } else {
                    toast.error(response.data.error);
                }

            } catch (error) {
                setError('Ocorreu um erro. Tente novamente.');
                toast.error('Erro ao tentar editar a reserva!', { autoClose: 3000 });
                console.error('Erro ao editar reserva:', error.response.data.message || error.message);
            }
        }
    };

    const setStatusPending = async (item) => {

        if (isLogged) {
            try {
                const response = await statusPending(token, item);

                if (response.status === 200 && response.data.message) {
                    toast.success('Reserva recuperada!', { autoClose: 3000 });
                    getTableData();
                } else {
                    toast.error(response.data.error, { autoClose: 3000 });
                }

            } catch (error) {
                setError('Ocorreu um erro. Tente novamente.');
                console.error('Erro ao editar reserva:', error.response.data.message || error.message);
                toast.error('Erro ao tentar recuperar a reserva!', { autoClose: 3000 });
            }
        }

    }

    const handleShowMessage = (reservation) => {
        if (showMessage) {
            setShowMessage(false);
            setReservation(null);
        } else {
            setShowMessage(true);
            setReservation(reservation);
        }
    }

    return (
        <Layout searchItem={searchItem} setSearchItem={handleSearchItem} updateIndex={getTableData}>
            <Helmet>
                <title>Reservas</title>
            </Helmet>
            <h1 className="view-title">Gestão de Reservas</h1>
            <div className="reservations-container">
                <ToastContainer />
                <div className="products-filters">
                    <div className="input-group">
                        <label htmlFor="status">Estado: </label>
                        <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(Number(e.target.value))}>
                            <option value={0}>Pendente</option>
                            <option value={1}>Aprovado</option>
                            <option value={3}>Tempo Excedido</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="table-title" colSpan="11">
                                Reservas
                            </th>
                        </tr>
                        <tr>
                            <th>Comercial</th>
                            <th>Referência</th>
                            <th>Encomenda</th>
                            <th>Cor</th>
                            <th>Tamanho</th>
                            <th>Quantidade</th>
                            {!showMessage ? <th>Mensagem</th> : null}
                            <th>Orçamento</th>
                            <th>Estado</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={!showMessage ? "11" : "10"}>A carregar dados...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={!showMessage ? "11" : "10"}>{error}</td>
                            </tr>
                        ) : paginatedReservations.length === 0 ? (
                            <tr>
                                <td colSpan={!showMessage ? "11" : "10"}>Sem Reservas disponíveis</td>
                            </tr>
                        ) : showMessage && reservation ? (
                            <>
                                <tr>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.ref}</td>
                                    <td>{reservation?.order || 'N/A'}</td>
                                    <td>{reservation.variant.color}</td>
                                    <td>{reservation?.variant.size || 'N/A'}</td>
                                    <td style={{ maxWidth: '110px' }}>{reservation.quantity}</td>
                                    <td style={{ maxWidth: '100px' }}>
                                        {reservation?.proposal
                                            ? reservation.proposal === 1
                                                ? 'Sim'
                                                : 'Não'
                                            : 'Não'}
                                    </td>
                                    <td style={{ maxWidth: '160px' }}><span className='reservation-status' style={{
                                        backgroundColor:
                                            reservation.status === 0 ? '#dbb427' :
                                                reservation.status === 1 ? 'green' :
                                                    'red',
                                        color: 'white',
                                    }}>{reservation.status === 0 ? (
                                        'Pendente'
                                    ) : reservation.status === 1 ? (
                                        'Aprovado'
                                    ) : reservation.status === 2 ? (
                                        'Reprovado'
                                    ) : 'Tempo Excedido'}
                                    </span>
                                    </td>
                                    <td style={{ maxwidth: '110px' }}>{new Date(reservation.created_at).toLocaleDateString('pt-PT')}</td>
                                    <td maxWidth="200px" className='cell-btns'>
                                        {reservation.status === 0 ? (
                                            <>
                                                <button onClick={() => approveReservation(reservation.id)} ><FaCheckCircle /></button>
                                                {/* <button onClick={() => disapproveReservation(item.id)}><FaTimesCircle /></button> */}
                                                <button onClick={() => openModal(reservation)}><FaEdit /></button>
                                            </>

                                        ) :
                                            <>
                                                <button style={{ background: '#60A5FA' }} onClick={() => setStatusPending(reservation)}><FaUndo /></button>
                                                <button style={{ background: '#F44336' }} onClick={() => handleDelete(reservation.id)}><FaTrash /></button>
                                            </>
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={'10'} style={{ textAlign: 'left' }}>Mensagem <button style={{ float: 'right' }} type="button" onClick={() => { handleShowMessage(reservation) }}><FaTimes /></button></th>
                                </tr>
                                <tr>
                                    <td colSpan={'10'} style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>{reservation.message}</td>
                                </tr>
                            </>
                        )
                            : (
                                paginatedReservations.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.ref}</td>
                                        <td>{item?.order || 'N/A'}</td>
                                        <td>{item.variant.color}</td>
                                        <td>{item?.variant.size || 'N/A'}</td>
                                        <td style={{ maxWidth: '110px' }}>{item.quantity}</td>
                                        {!showMessage ? (
                                            <td style={{ maxWidth: '200px', whiteSpace: 'pre-line' }}>
                                                {item.message ? <button className='btnSeeMessage' onClick={() => handleShowMessage(item)}>Ver</button> : 'N/A'}
                                            </td>
                                        ) : null}

                                        <td style={{ maxWidth: '100px' }}>
                                            {item?.proposal
                                                ? item.proposal === 1
                                                    ? 'Sim'
                                                    : 'Não'
                                                : 'Não'}
                                        </td>
                                        <td style={{ maxWidth: '160px' }}><span className='reservation-status' style={{
                                            backgroundColor:
                                                item.status === 0 ? '#dbb427' :
                                                    item.status === 1 ? 'green' :
                                                        'red',
                                            color: 'white',
                                        }}>{item.status === 0 ? (
                                            'Pendente'
                                        ) : item.status === 1 ? (
                                            'Aprovado'
                                        ) : item.status === 2 ? (
                                            'Reprovado'
                                        ) : 'Tempo Excedido'}
                                        </span>
                                        </td>
                                        <td style={{ maxwidth: '110px' }}>{new Date(item.created_at).toLocaleDateString('pt-PT')}</td>
                                        <td maxWidth="200px" className='cell-btns'>
                                            {item.status === 0 ? (
                                                <>
                                                    <button onClick={() => approveReservation(item.id)} ><FaCheckCircle /></button>
                                                    {/* <button onClick={() => disapproveReservation(item.id)}><FaTimesCircle /></button> */}
                                                    <button onClick={() => openModal(item)}><FaEdit /></button>
                                                </>

                                            ) :
                                                <>
                                                    <button style={{ background: '#60A5FA' }} onClick={() => setStatusPending(item)}><FaUndo /></button>
                                                    <button style={{ background: '#F44336' }} onClick={() => handleDelete(item.id)}><FaTrash /></button>
                                                </>
                                            }

                                        </td>

                                    </tr>
                                )

                                ))
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    {!showMessage ? (<p style={{ float: 'left' }}>A mostrar {filteredReservations.length} reservas...</p>) : null}
                    <Pagination items={filteredReservations} itemsPerPage={itemsPerPage} setPaginatedItems={setPaginatedReservations} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

            </div>

            {showModal ? (
                <>
                    <div className="modal-overlay"></div>
                    <div className='reservations-modal'>
                        <button type="button" onClick={() => { setShowModal(false); { !showMessage ? setReservation(null) : null } }}><FaTimes /></button>
                        <h2>Editar Reserva</h2>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="inputName">Comercial: </label>
                            <input
                                id="inputName"
                                type='text'
                                name='name'
                                value={reservation.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="inputOrder">Nº Encomenda: </label>
                            <input
                                id="inputOrder"
                                type='text'
                                name='order'
                                value={reservation.order}
                                onChange={handleChange}
                                
                            />
                            <label htmlFor="inputQuantity">Quantidade: </label>
                            <input
                                id="inputQuantity"
                                type='number'
                                name='quantity'
                                value={reservation.quantity}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="inputMessage">Mensagem: </label>
                            <textarea
                                id="inputMessage"
                                type='text'
                                name='message'
                                value={reservation.message}
                                onChange={handleChange}
                            />

                            <div className="checkbox-group">
                                <input type="checkbox" checked={reservation.proposal === 1} value="1" name="proposal" id="proposal" onChange={handleChange}></input>
                                <label htmlFor="proposal">Orçamento</label>
                            </div>

                            <button type="submit">Editar Reserva</button>
                        </form>

                    </div>
                </>
            ) : null
            }
        </Layout >
    );
};

export default ReservationsIndex;