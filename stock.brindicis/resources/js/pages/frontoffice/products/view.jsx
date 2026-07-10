import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaEraser } from "react-icons/fa";
import { fetchProduct } from "../../../api/stockApi";
import { fetchProductVariants } from "../../../api/productVariantsApi";

const ViewProduct = ({
    productId,
    setShowView,
    setStatus,
    setShowCreateReservation,
    setShowReservations,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize
}) => {

    const [isLogged, setIsLoggedIn] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [productVariants, setProductVariants] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [activeImages, setActiveImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

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
        const getProduct = async () => {

            if (token === null || token === '') {
                setLoading(false);
                return;
            }
            setProduct(null);
            setLoading(true);
            setProductVariants([]);



            try {
                const response = await fetchProduct(token, productId);
                const responseVariants = await fetchProductVariants(token, productId);

                setProduct(response);
                setProductVariants(responseVariants);


                if (response.sizes.length === 1) {
                    setSelectedSize(response.sizes[0].size);
                }

                if (response.colors.length === 1) {
                    setSelectedColor(response.colors[0].name);
                }

            } catch (error) {
                toast.error("Erro ao carregar produto.", { autoClose: 3000 });
                console.error("Erro ao ir buscar o produto:", error.response.data.message || error.message);
            }

            setLoading(false);
        }

        getProduct();
    }, [productId, isLogged]);

    const clearProduct = () => {
        setShowView(false);
        setStatus(0);
        setShowCreateReservation(false);
        setShowReservations(false);
        setSelectedColor(null);
        setSelectedSize(null);
    }

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
        console.log(newSelectedSize);
        console.log(selectedColor);

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

    useEffect(() => {
        setSelectedColor(null);
        setSelectedSize(null);
    }, [productId]);



    return (
        <div className="product-information">
            {product ? (
                <>
                    <h2>Detalhes do Produto</h2>
                    <button className="btnClearProduct" onClick={clearProduct}><FaEraser /></button>
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
                                    <p style={{ textAlign: 'center', color: 'rgb(119, 119, 119)' }}>Sem Imagem</p>
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
                                <span>Ref:</span>
                                <p>{product?.ref ?? 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <span>Nome:</span>
                                <p className="short-description">
                                    {product?.name?.length > 15 ?
                                        <>
                                            {`${product.name.slice(0, 15)}...`}
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
                                <span>Gaveta:</span>
                                <p className="short-description">
                                    {product?.drawer?.length > 15 ?
                                        <>
                                            {`${product.drawer.slice(0, 15)}...`}
                                            <span className="tooltip">{product?.drawer ?? 'N/A'}</span>
                                        </> :
                                        product?.drawer ?? 'N/A'
                                    }
                                </p>
                            </div>
                            <div className="detail-item">
                                <span>Cx:</span>
                                <p>{product?.cx ?? 'N/A'}</p>
                            </div>
                            <div className="detail-item">
                                <span>Número:</span>
                                <p>{product?.number ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%' }} className="product-details">
                        <div className="detail-item">
                            <span>Família:</span>
                            <p>{product?.family?.name ?? 'N/A'}</p>
                        </div>

                        <div className="detail-item">
                            <span>Cor:</span>
                            {product.colors?.length > 1 ? (
                                <select onChange={handleColorChange} value={selectedColor || "0"}>
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
                                    <select onChange={handleSizeChange} value={selectedSize || "0"}>
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
                            <span>PVP:</span>
                            <p>{`${product?.pvp} €` ?? 'N/A'}</p>
                        </div>
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
                            <span>Descrição:</span>
                            <p className="short-description">
                                {product?.description?.length > 35 ?
                                    <>
                                        {`${product.description.slice(0, 35)}...`}
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
            ) : loading ? (
                <p className="result-alert">A carregar produto...</p>
            ) : (
                <p className="result-alert">Nenhum produto selecionado ou não encontrado.</p>
            )
            }
        </div >
    );
}

export default ViewProduct;