import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/layout_backoffice/layout';
import { FaWarehouse, FaBox } from 'react-icons/fa';
import axios from 'axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { fetchRecentReservations } from '../../../api/reservationsApi';
import { fetchStock } from '../../../api/stockApi';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const [stockCounter, setStockCounter] = useState(0);
  const [reservedStock, setReservedStock] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem('loggedInBo');
    if (isLogged) {
      const session = JSON.parse(localStorage.getItem('loggedInBo'));

      if (session.value === true) {
        setIsLoggedIn(true);
        setToken(session.token)
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const updateStock = async () => {
    try {
      const response = await fetchStock(token);

      setStockCounter(response.data.stockCounter);
      setReservedStock(response.data.reservedStock);

    } catch (error) {
      setError('Erro ao ir buscar os dados de stock');
      console.error('Erro na funçao updateStock', error.response.data.message || error.message);
      toast.error('Erro ao ir buscar os dados de stock', {
        autoClose: 3000,
      });
    }
  }

  const getRecentReservations = async () => {
    setLoading(true);

    if (isLoggedIn) {
      try {
        const response = await fetchRecentReservations(token);
        setReservations(response);
        setFilteredReservations(response);

      } catch (error) {
        setError('Erro ao ir buscar as reservas.');
        console.error('Erro na funçao getRecentReservations:', error.response.data.message || error.message);
        toast.error('Erro ao ir buscar as reservas.', {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  const handleSearchItem = (newSearchItem) => {
    setSearchItem(newSearchItem);
  };

  useEffect(() => {
    if (searchItem === '') {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter((reservation) =>
        reservation.ref.toLowerCase().includes(searchItem.toLowerCase()) ||
        reservation.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        reservation.variant.color.toLowerCase().includes(searchItem.toLowerCase()) ||
        reservation.variant.size.toLowerCase().includes(searchItem.toLowerCase()) ||
        String(reservation.quantity || '').includes(searchItem)
      );
      setFilteredReservations(filtered);
    }
  }, [searchItem, reservations]);

  useEffect(() => {
    if (isLoggedIn) {
      updateStock();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      getRecentReservations();
    }
  }, [isLoggedIn]);

  return (
    <Layout
      searchItem={searchItem}
      setSearchItem={handleSearchItem}
      updateStock={updateStock}
      getRecentReservations={getRecentReservations}
    >
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <ToastContainer />
      <div className="stats-container">
        <div className="stats-stock">
          <div className="info">
            <h3>Produtos em stock: </h3>
            <p>{stockCounter}</p>
          </div>
          <FaWarehouse className="stats-icon" />
        </div>
        <div className="stats-stock">
          <div className="info">
            <h3>Produtos Reservados: </h3>
            <p>{reservedStock}</p>
          </div>
          <FaBox className="stats-icon" />
        </div>
      </div>

      <div className="recent-bookings">
        <table>
          <thead>
            <tr>
              <th className="table-title" colSpan="7">
                Reservas Recentes
                <button onClick={() => navigate('/reservations')}>Ver tudo</button>
              </th>
            </tr>
            <tr>
              <th>Imagem</th>
              <th>Referência</th>
              <th>Comercial</th>
              <th>Cor</th>
              <th>Tamanho</th>
              <th>Qnt. reservada</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">A carregar dados...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7">{error}</td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="7">Sem dados disponíveis</td>
              </tr>
            ) : (
              filteredReservations.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item?.image ? (
                      <img src={item.image} alt={item?.name || 'Product Image'} />
                    ) : (
                      'Sem imagem'
                    )}
                  </td>
                  <td>{item.ref}</td>
                  <td>{item.name}</td>
                  <td>{item.variant.color}</td>
                  <td>{item.variant.size || 'N/A'}</td>
                  <td>{item.quantity}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;
