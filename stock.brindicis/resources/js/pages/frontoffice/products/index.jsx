import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import Layout from "../../../components/layout_frontoffice/layout";
import ProductsFilter from '../../../components/products_filter';
import { fetchProducts } from "../../../api/stockApi";
import Pagination from "../../../components/pagination";

const Index = () => {

    const [isLogged, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(24);
    const [searchItem, setSearchItem] = useState('');
    const [selecteditem, setSelectedItem] = useState(null);
    const [showView, setShowView] = useState(false);
    const [showReservations, setShowReservations] = useState(false);
    const [showCreateReservation, setShowCreateReservation] = useState(false);
    const [status, setStatus] = useState(1);
    const [token, setToken] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [paginatedProducts, setPaginatedProducts] = useState([]);

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

    useEffect(() => {
        if (status === 0) {
            setSelectedItem(null);
        }
    }, [status])

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await fetchProducts(token);

            setProducts(response);
            setFilteredProducts(response);

        } catch (error) {
            setError('Erro ao ir buscar os produtos.');
            console.error('Erro ao ir buscar os produtos', error.response.data.message || error.message);
            toast.error('Erro ao ir buscar os produtos.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isLogged) {
            getProducts();
            const interval = setInterval(() => {
                getProducts();
                toast.info('A atualizar dados...', {
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    draggable: false,
                    closeOnClick: true,
                    className: 'small-toast',
                    bodyClassName: 'small-toast-body'
                });
            }, 30 * 60 * 1000);

            return () => {
                clearInterval(interval);
            }
        }


    }, [isLogged])

    const handleSearchItem = (newSearchItem) => {
        setSearchItem(newSearchItem);
    };

    useEffect(() => {
        setCurrentPage(1);
        if (searchItem === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.ref.toLowerCase().includes(searchItem.toLowerCase()) ||
                Array.isArray(product.colors) &&
                product.colors.map(c => c.name).join(', ').toLowerCase().includes(searchItem.toLowerCase()) ||
                product.drawer.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.cx.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.category.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.type.toLowerCase().includes(searchItem.toLowerCase()) ||
                (product.number && String(product.number).includes(searchItem)) ||
                String(product.quantity).includes(searchItem) ||
                product.name.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
                product.family.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchItem, products]);



    const handleFilterChange = (filters) => {
        setCurrentPage(1);
        const { category, status, active, family } = filters;

        let filtered = products;

        if (category !== '') {
            filtered = filtered.filter((product) => String(product.category.id) === String(category));
        }

        if (family !== '') {
            filtered = filtered.filter((product) => String(product.family.id) === String(family));
        }

        if (status !== '') {
            if (status === '3') {
                filtered = filtered.filter((product) => product.quantity === 0);
            } else if (status === '2') {
                filtered = filtered.filter((product) => product.quantity <= 30 && product.quantity > 0);
            } else if (status === '1') {
                filtered = filtered.filter((product) => product.quantity >= 30);
            }
        }

        if (active !== '') {
            filtered = filtered.filter((product) => String(product.active) === String(active));
        }

        setFilteredProducts(filtered);
    };

    const handleSelectCard = (productId) => {
        if (selecteditem === null || selecteditem !== productId) {
            setSelectedItem(productId);
            setShowView(true);
            setStatus(1);
            setShowCreateReservation(false);
            setShowReservations(false);
        } else {
            setSelectedItem(null);
            setShowView(false);
            setShowCreateReservation(false);
            setShowReservations(false);
            setStatus(0);
        }
    }

    return (
        <Layout
            showView={showView}
            setShowView={setShowView}
            productId={selecteditem}
            searchItem={searchItem}
            setSearchItem={handleSearchItem}
            showCreateReservation={showCreateReservation}
            setShowCreateReservation={setShowCreateReservation}
            showReservations={showReservations}
            setShowReservations={setShowReservations}
            setStatus={setStatus}
            refreshIndex={getProducts}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
        >
            <Helmet>
                <title>Produtos</title>
            </Helmet>
            <div className="container">
                <h1 className="view-title">Produtos</h1>
                <div className="products-container">
                    <ToastContainer />
                    <ProductsFilter width="100%" onFilterChange={handleFilterChange} />
                    <div className="products">
                        {error ? (
                            <p className="result-alert">{error}</p>
                        ) : filteredProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                product.active === 1 ? (
                                    <div key={product.id} onClick={() => { handleSelectCard(product.id) }} className={`product-card ${selecteditem === product.id ? 'selected' : ''}`}>
                                        <div className="imgZone">
                                            {product.images.length > 0 ? (
                                                <img src={product.images[0].url} alt={product.name || 'Produto'} />
                                            ) : (
                                                <p>Sem Imagem</p>
                                            )}
                                        </div>
                                        <div className="details">
                                            <p><span>Ref:</span> {product?.ref || 'N/A'}</p>
                                            <p><span>Quantidade:</span> {product.quantity}</p>
                                            <p><span>Cor:</span> {product.colors.length === 1 ? product.colors[0].name : product.colors.length === 2 ? `${product.colors[0].name}, ${product.colors[1].name}` : product.colors.length > 2 ? `${product.colors[0].name}, ${product.colors[1].name} + ${product.colors.length-2}`: 'N/A'}</p>
                                        </div>
                                    </div>
                                ) : null
                            ))
                        ) : loading ? (

                            <p className="result-alert">A carregar produtos...</p>

                        ) : (
                            <p className="result-alert">Nenhum resultado obtido...</p>
                        )}
                    </div>


                    <div className="pagination">
                        <p style={{ float: 'left' }}>A mostrar {filteredProducts.length} produtos...</p>
                        <Pagination items={filteredProducts} itemsPerPage={itemsPerPage} setPaginatedItems={setPaginatedProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Index;