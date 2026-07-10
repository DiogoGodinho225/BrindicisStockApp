import React, { use, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/layout_backoffice/layout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ProductsFilter from '../../../components/products_filter';
import { FaEye, FaEdit, FaTrash, FaTimes, FaArrowLeft, FaHistory } from 'react-icons/fa';
import LogsIndex from '../Log';
import { fetchProducts, deleteProduct } from '../../../api/stockApi';
import { fetchProductVariants } from '../../../api/productVariantsApi';
import Pagination from '../../../components/pagination';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const StockIndex = () => {

    const [isLogged, setIsLoggedIn] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [showViewModal, setShowViewModal] = useState(false);
    const [product, setProduct] = useState(null);
    const [token, setToken] = useState('');
    const [showLogs, setShowLogs] = useState(false);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [productVariants, setProductVariants] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [activeImages, setActiveImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);


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
            const response = await fetchProducts(token);

            setProducts(response);
            setFilteredProducts(response);

        } catch (error) {
            setError('Erro ao ir buscar os produtos.');
            toast.error('Erro ao ir procurar os produtos.', { autoClose: 3000 });
            console.error('Erro na funçao getTableData Products:', error.response.data.message || error.message);
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
            setFilteredProducts(Products);
        } else {
            const filtered = Products.filter((product) =>
                product.ref.toLowerCase().includes(searchItem.toLowerCase()) ||
                Array.isArray(product.colors) &&
                product.colors.map(c => c.name).join(', ').toLowerCase().includes(searchItem.toLowerCase()) ||
                product.drawer.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.cx.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.category.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                product.type.toLowerCase().includes(searchItem.toLowerCase()) ||
                (product.number && String(product.number).includes(searchItem)) ||
                product.name.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
                product.family.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchItem, Products]);



    const handleFilterChange = (filters) => {
        setCurrentPage(1);

        const { category, status, active, family } = filters;

        let filtered = Products;

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

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja eliminar este produto?');

        if (confirmDelete) {
            try {

                const response = await deleteProduct(token, productId);

                if (response.status === 200) {
                    if (response.data.message) {
                        toast.success('Produto deletado com sucesso!', { autoClose: 3000 });
                        getTableData();
                    } else {
                        toast.error(response.data.error, { autoClose: 3000 })
                    }
                } else {
                    toast.error('Erro ao deletar o produto!', { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Erro ao tentar deletar o produto!', { autoClose: 3000 });
                console.error('Erro na funçao handleDelete:', error.response.data.message || error.message);
            }
        } else {
            toast.info('Exclusão cancelada.', { autoClose: 2000 });
        }
    };


    const openViewModal = async (productId) => {

        const response = await axios.get('/api/getProduct', {
            params: {
                id: productId,
                token: token,
            }
        });

        const responseVariants = await fetchProductVariants(token, productId);
        setProductVariants(responseVariants);

        if (response.status === 200) {
            setProduct(response.data.product);
            setShowViewModal(true);
            setShowLogs(false);

            if (response.data.product.sizes.length === 1) {
                setSelectedSize(response.data.product.sizes[0].size);
            }

            if (response.data.product.colors.length === 1) {
                setSelectedColor(response.data.product.colors[0].name);
            }
        } else {
            toast.error('Erro ao abrir a visualização do produto!', { autoClose: 3000 });
        }
    }


    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedColor(null);
        setSelectedSize(null);
    }

    const handleExport = async () => {
        const { exportToExcel } = await import('../../../components/utils/exportToExcel');
        exportToExcel(Products, token);
    };

    const handleColorChange = (e) => {
        const selectedColorValue = e.target.value;
        const newSelectedColor = selectedColorValue === '0' ? null : selectedColorValue;
        setSelectedColor(newSelectedColor);

        let totalQuantity = 0;
        let totalReserved = 0;
        let variantImages = [];

        if (newSelectedColor && selectedSize) {
            const matchingVariant = productVariants.find(
                variant => variant.color === newSelectedColor && variant.size === selectedSize
            );
            if (matchingVariant) {
                totalQuantity = matchingVariant.quantity;
                totalReserved = matchingVariant.reserved;
            }
        }

        if (newSelectedColor) {
            const colorVariants = productVariants.filter(variant => variant.color === newSelectedColor);
            totalQuantity = colorVariants.reduce((sum, v) => sum + v.quantity, 0);
            totalReserved = colorVariants.reduce((sum, v) => sum + v.reserved, 0);
            variantImages = colorVariants[0]?.images || [];
        } else if (!newSelectedColor && !selectedSize) {
            totalQuantity = product.quantity;
            totalReserved = product.reserved;
        } else if (!newSelectedColor && selectedSize) {
            const sizeVariants = productVariants.filter(variant => variant.size === selectedSize);
            totalQuantity = sizeVariants.reduce((sum, v) => sum + v.quantity, 0);
            totalReserved = sizeVariants.reduce((sum, v) => sum + v.reserved, 0);
        }

        setProduct({
            ...product,
            variantQuantity: totalQuantity,
            variantReserved: totalReserved,
            color: newSelectedColor,
            variantImages: variantImages || []
        });
    };


    const handleSizeChange = (e) => {
        const selectedSizeValue = e.target.value;
        const newSelectedSize = selectedSizeValue === '0' ? null : selectedSizeValue;
        setSelectedSize(newSelectedSize);

        let totalQuantity = 0;
        let totalReserved = 0;

        if (selectedColor && newSelectedSize) {
            const matchingVariant = productVariants.find(
                variant => variant.size === newSelectedSize && variant.color === selectedColor
            );
            if (matchingVariant) {
                totalQuantity = matchingVariant.quantity;
                totalReserved = matchingVariant.reserved;
            }
        } else if (newSelectedSize) {
            const sizeVariants = productVariants.filter(variant => variant.size === newSelectedSize);
            totalQuantity = sizeVariants.reduce((sum, v) => sum + v.quantity, 0);
            totalReserved = sizeVariants.reduce((sum, v) => sum + v.reserved, 0);
        } else if (!selectedColor && !newSelectedSize) {
            totalQuantity = product.quantity;
            totalReserved = product.reserved;
        } else if (selectedColor && !newSelectedSize) {
            const colorVariants = productVariants.filter(variant => variant.color === selectedColor);
            totalQuantity = colorVariants.reduce((sum, v) => sum + v.quantity, 0);
            totalReserved = colorVariants.reduce((sum, v) => sum + v.reserved, 0);
        }

        setProduct(prev => ({
            ...prev,
            variantReserved: totalReserved,
            variantQuantity: totalQuantity,
            size: newSelectedSize,
            variantImages: prev.variantImages
        }));
    };

    useEffect(() => {
        if (selectedColor) {

            const filtered = productVariants.filter(variant => variant.color === selectedColor);
            const sizeMap = {};
            filtered.forEach(v => {
                sizeMap[v.size] = (sizeMap[v.size] || 0) + v.quantity;
            });
            const sizesWithQty = Object.entries(sizeMap).map(([size, qty]) => ({ size, quantity: qty }));
            setAvailableSizes(sizesWithQty);
        } else {

            const sizeMap = {};
            productVariants.forEach(v => {
                sizeMap[v.size] = (sizeMap[v.size] || 0) + v.quantity;
            });
            const sizesWithQty = Object.entries(sizeMap).map(([size, qty]) => ({ size, quantity: qty }));
            setAvailableSizes(sizesWithQty);
        }
    }, [selectedColor, productVariants]);

    useEffect(() => {
        if (selectedSize) {

            const filtered = productVariants.filter(variant => variant.size === selectedSize);
            const colorMap = {};
            filtered.forEach(v => {
                colorMap[v.color] = (colorMap[v.color] || 0) + v.quantity;
            });
            const colorsWithQty = Object.entries(colorMap).map(([color, qty]) => ({ color, quantity: qty }));
            setAvailableColors(colorsWithQty);
        } else {

            const colorMap = {};
            productVariants.forEach(v => {
                colorMap[v.color] = (colorMap[v.color] || 0) + v.quantity;
            });
            const colorsWithQty = Object.entries(colorMap).map(([color, qty]) => ({ color, quantity: qty }));
            setAvailableColors(colorsWithQty);
        }
    }, [selectedSize, productVariants]);


    useEffect(() => {
        if (product) {
            if (product.variantImages?.length > 0) {
                setActiveImages(product.variantImages);
            } else if (product.images?.length > 0) {
                setActiveImages(product.images);
            } else {
                setActiveImages([]);
            }

            const carouselElement = document.querySelector('#myCarousel');
            if (carouselElement) {
                const carousel = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement);
                carousel.to(0);
            }
        }
    }, [product, selectedColor]);

    useEffect(() => {
        const carouselElement = document.querySelector('#myCarousel');

        if (carouselElement) {
            const existingInstance = bootstrap.Carousel.getInstance(carouselElement);
            if (existingInstance) existingInstance.dispose();

            const newInstance = new bootstrap.Carousel(carouselElement);
            newInstance.to(0);
            setCurrentSlide(0);

            const handleSlide = (e) => {
                setCurrentSlide(e.to);
            };

            carouselElement.addEventListener('slid.bs.carousel', handleSlide);

            return () => {
                carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
            };
        }
    }, [activeImages]);


    return (
        <Layout searchItem={searchItem} setSearchItem={handleSearchItem}>
            <Helmet>
                <title>Stock</title>
            </Helmet>
            <h1 className='view-title'>Gestão de Stock</h1>
            <div className='stock-container'>
                <ToastContainer />
                <ProductsFilter width="70%" onFilterChange={handleFilterChange} />
                <button onClick={() => navigate('/create-product')} className='btnAddProduct'>Adicionar Produto</button>
                <table>
                    <thead>
                        <tr>
                            <th className="table-title" colSpan="12">
                                Produtos
                                <button onClick={handleExport}>Exportar</button>
                            </th>
                        </tr>
                        <tr>
                            <th>Imagem</th>
                            <th>Tipo</th>
                            <th>Ref</th>
                            <th>Cor</th>
                            <th>Qntd</th>
                            <th>Qntd R.</th>
                            <th>Gaveta</th>
                            <th>Cx</th>
                            <th>PVP</th>
                            <th>Fornecedor</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="12">A carregar dados...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="12">{error}</td>
                            </tr>
                        ) : paginatedProducts.length === 0 ? (
                            <tr>
                                <td colSpan="12">Sem Produtos disponíveis</td>
                            </tr>
                        ) : (
                            paginatedProducts.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ textAlign: 'center', width: '80px' }}>{item.images && item.images.length > 0 && item.images[0].url ? (
                                        <img
                                            src={item.images[0].url}
                                            alt="Imagem do Produto"
                                            style={{
                                                maxWidth: '70px',
                                                maxHeight: '70px',
                                                display: 'inline-block',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                            }}
                                        />
                                    ) : (
                                        'Sem Imagem'
                                    )}</td>
                                    <td style={{ textAlign: 'center', width: '140px' }}>{item.type}</td>
                                    <td style={{ textAlign: 'center', width: '140px' }}>{item.ref}</td>
                                    <td style={{ textAlign: 'center', width: '160px' }}>
                                        {Array.isArray(item.colors) && item.colors.length > 0 ? (
                                            item.colors.length === 1 ? (
                                                item.colors[0]?.name
                                            ) : item.colors.length === 2 ? (
                                                `${item.colors[0]?.name}, ${item.colors[1]?.name}`
                                            ) : (
                                                `${item.colors[0]?.name}, ${item.colors[1]?.name}, +${item.colors.length - 2}`
                                            )
                                        ) : (
                                            'N/A'
                                        )}</td>
                                    <td style={{ textAlign: 'center', width: '100px', color: item.quantity === 0 ? 'red' : '' }}>{item.quantity}</td>
                                    <td width={'80px'}>{item.reserved}</td>
                                    <td style={{ textAlign: 'center', width: '140px' }}>{item.drawer}</td>
                                    <td style={{ textAlign: 'center', width: '140px' }}>{item.cx}</td>
                                    <td style={{ textAlign: 'center', width: '100px' }}>{item.pvp} €</td>
                                    <td style={{ textAlign: 'center', width: '140px' }}>{item.category.name}</td>
                                    <td style={{ textAlign: 'center', width: '120px' }}><span className='stock-active' style={{
                                        backgroundColor: item.active === 1 ? 'green' : 'red',

                                    }}>{item.active === 1 ? 'Ativo' : 'Desativo'}</span></td>
                                    <td width="200px" className='cell-btns'>
                                        <button onClick={() => openViewModal(item.id)} ><FaEye /></button>
                                        <button onClick={() => navigate(`/edit-product/${item.id}`)}><FaEdit /></button>
                                        <button onClick={() => { handleDelete(item.id) }}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <p style={{ float: 'left' }}>A mostrar {filteredProducts.length} produtos...</p>
                    <Pagination items={filteredProducts} itemsPerPage={itemsPerPage} setPaginatedItems={setPaginatedProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

            </div>

            {showViewModal ? (
                <>
                    <div className="modal-overlay"></div>
                    <div className="view-product-modal">
                        <button type="button" onClick={closeViewModal}>
                            <FaTimes />
                        </button>
                        {showLogs === false ? (
                            <button style={{ float: 'left' }} type="button" onClick={() => setShowLogs(true)}>
                                <FaHistory />
                            </button>
                        ) :
                            <button style={{ float: 'left' }} type="button" onClick={() => setShowLogs(false)}>
                                <FaArrowLeft />
                            </button>
                        }

                        <h2>{showLogs === false ? 'Detalhes do Produto' : 'Histórico'}</h2>
                        {showLogs === false ? (
                            <>
                                <div className='view-product-details'>
                                    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
                                        {(activeImages.length > 1) && (
                                            <div className="carousel-indicators">
                                                {activeImages.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        data-bs-target="#myCarousel"
                                                        data-bs-slide-to={index}
                                                        className={`indicators ${index === currentSlide ? "active" : ""}`}
                                                        aria-current={index === currentSlide ? "true" : undefined}
                                                        aria-label={`Slide ${index + 1}`}
                                                    ></button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="carousel-inner">
                                            {activeImages.length > 0 ? (
                                                activeImages.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt={`Image ${index + 1}`}
                                                            className="d-block w-100"
                                                        />
                                                    </div>
                                                ))
                                            ) : <div className="carousel-item active">
                                                <p>Sem Imagem</p>
                                            </div>}

                                        </div>

                                        {activeImages.length > 1 ? (
                                            <>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target="#myCarousel"
                                                    data-bs-slide="prev"
                                                >
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target="#myCarousel"
                                                    data-bs-slide="next"
                                                >
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        ) : null}
                                    </div>


                                    <div className="product-details">
                                        <div className="detail-item">
                                            <span>Tipo:</span>
                                            <p>{product?.type ?? 'N/A'}</p>
                                        </div>
                                        <div className="detail-item">
                                            <span>Ref:</span>
                                            <p>{product?.ref ?? 'N/A'}</p>
                                        </div>
                                        <div className="detail-item">
                                            <span>Nome:</span>
                                            <p className="short-description">
                                                {product?.name?.length > 30 ?
                                                    <>
                                                        {`${product.name.slice(0, 30)}...`}
                                                        <span className="tooltip">{product?.name ?? 'N/A'}</span>
                                                    </> :
                                                    product?.name ?? 'N/A'
                                                }
                                            </p>
                                        </div>
                                        <div className="detail-item">
                                            <span>Quantidade:</span>
                                            {product.variantQuantity || product.variantQuantity === 0 ? (
                                                <p style={{ color: product?.variantQuantity === 0 ? 'red' : '' }}>{product?.variantQuantity ?? 'N/A'}</p>
                                            ) :
                                                <p style={{ color: product?.quantity === 0 ? 'red' : '' }}>{product?.quantity ?? 'N/A'}</p>
                                            }
                                        </div>
                                        <div className="detail-item">
                                            <span>Reservados:</span>
                                            {product.variantReserved || product.variantReserved === 0 ? (
                                                <p>{product?.variantReserved ?? 'N/A'}</p>
                                            ) :
                                                <p>{product?.reserved ?? 'N/A'}</p>
                                            }
                                        </div><div className="detail-item">
                                            <span>Gaveta:</span>
                                            <p className="short-description">
                                                {product?.drawer?.length > 20 ?
                                                    <>
                                                        {`${product.drawer.slice(0, 20)}...`}
                                                        <span className="tooltip">{product?.drawer ?? 'N/A'}</span>
                                                    </> :
                                                    product?.drawer ?? 'N/A'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '100%' }} className="product-details">
                                    <div className="detail-item">
                                        <span>Cx:</span>
                                        <p>{product?.cx ?? 'N/A'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Número:</span>
                                        <p>{product?.number ?? 'N/A'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>PVP:</span>
                                        <p>{`${product?.pvp} €` ?? 'N/A'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Família:</span>
                                        <p>{product?.family?.name ?? 'N/A'}</p>
                                    </div>

                                    <div className="detail-item">
                                        <span>Cor:</span>
                                        {product.colors?.length > 1 ? (
                                            <select onChange={handleColorChange} value={selectedColor || 0}>
                                                <option value="0">Todos</option>
                                                {availableColors.map((item, index) => (
                                                    <option key={index} value={item.color}>
                                                        {item.color} ({item.quantity})
                                                    </option>
                                                ))}
                                            </select>
                                        ) : product.colors?.length === 1 ? (
                                            <p className="short-description">
                                                {availableColors[0]?.color?.length > 45 ? (
                                                    <>
                                                        {`${availableColors[0].color.slice(0, 45)}...`}
                                                        <span className="tooltip">
                                                            {availableColors[0].color} ({availableColors[0]?.quantity || "0"})
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {availableColors[0]?.color || "N/A"} ({availableColors[0]?.quantity || "0"})
                                                    </>
                                                )}
                                            </p>
                                        ) : (
                                            <p>N/A</p>
                                        )}
                                    </div>

                                    {product.family?.id === 1 ? (
                                        <div className="detail-item">
                                            <span>Tamanho:</span>
                                            {product.sizes?.length > 1 ? (
                                                <select onChange={handleSizeChange} value={selectedSize || 0}>
                                                    <option value="0">Todos</option>
                                                    {availableSizes.map((item, index) => (
                                                        <option key={index} value={item.size}>
                                                            {item.size} ({item.quantity})
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : product.sizes?.length === 1 ? (
                                                <p className="short-description">
                                                    {availableSizes[0]?.size || "0"} ({availableSizes[0]?.quantity || "0"})
                                                </p>
                                            ) : (
                                                <p>N/A</p>
                                            )}
                                        </div>
                                    ) : null}

                                    <div className="detail-item">
                                        <span>Fornecedor:</span>
                                        <p>{product?.category?.name ?? 'N/A'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Disponibilidade:</span>
                                        <p style={{
                                            color: product?.status === 2 ? 'green' : product?.status === 1 ? '#e8ab02' : 'red',
                                        }}
                                        ><strong>
                                                {product?.status === 2 ? 'Com Stock' : product?.status === 1 ? 'Quase Esgotado' : product?.status === 0 ? 'Esgotado' : 'N/A'}</strong></p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Estado:</span>
                                        <p style={{
                                            background: product?.active === 1 ? 'green' : 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', textAlign: 'center'
                                        }}>{product?.active === 1 ? 'Ativo' : 'Desativo'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Descrição:</span>
                                        <p className="short-description">
                                            {product?.description?.length > 45 ?
                                                <>
                                                    {`${product.description.slice(0, 45)}...`}
                                                    <span className="tooltip">{product?.description ?? 'N/A'}</span>
                                                </> :
                                                product?.description ?? 'N/A'
                                            }
                                        </p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Data de criação:</span>
                                        <p>{product?.created_at ? new Date(product.created_at).toLocaleString('pt-PT') : 'N/A'}</p>
                                    </div>
                                    <div className="detail-item">
                                        <span>Última atualização:</span>
                                        <p>{product?.updated_at ? new Date(product.updated_at).toLocaleString('pt-PT') : 'N/A'}</p>
                                    </div>
                                </div>
                            </>
                        ) : <LogsIndex productId={product.id} />}
                    </div>
                </>
            ) : null
            }
        </Layout >
    );
}

export default StockIndex;