import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/layout_backoffice/layout";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { editProduct, fetchProduct } from "../../../api/stockApi";
import { fetchCategories } from "../../../api/categoriesApi";
import { fetchFamilies } from "../../../api/familiesApi";
import { fetchProductVariants } from "../../../api/productVariantsApi";
import { v4 as uuidv4 } from 'uuid';

const StockUpdate = () => {
    const [isLogged, setIsLoggedIn] = useState(false);
    const [Categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        type: '',
        ref: '',
        quantity: 0,
        drawer: '',
        cx: '',
        pvp: '',
        id_category: '',
        description: '',
        name: '',
        number: '',
        active: '1',
        id_family: '',
    });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [families, setFamilies] = useState([]);
    const [hasSizes, setHasSizes] = useState(false);
    const [variants, setVariants] = useState([{ localKey: uuidv4(), id: '', color: '', sizes: [], quantity: 0, images: [] }]);
    const [variantsToDelete, setVariantsToDelete] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [sizesToDelete, setSizesToDelete] = useState([]);

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

    const transformProductVariants = (productVariants) => {
        const grouped = {};

        productVariants.forEach(variant => {
            const { id, color, size, quantity, images } = variant;

            if (!grouped[color]) {
                grouped[color] = {
                    id,
                    localKey: uuidv4(),
                    color,
                    sizes: [],
                    quantity,
                    images: []
                };
            }

            if (size) {
                grouped[color].sizes.push({ localKey: uuidv4(), size, quantity });
            }

            if (images && images.length > 0 && grouped[color].images.length === 0) {
                grouped[color].images = images.map(img => ({ id: img.id, url: img.url }));
            }
        });

        return Object.values(grouped);
    };

    useEffect(() => {
        if (isLogged) {
            const getProduct = async () => {
                try {
                    const response = await fetchProduct(token, id);
                    setProduct(response);
                    setHasSizes(response.id_family == 1);
                } catch (error) {
                    console.error('Erro ao procurar produto:', error.response?.data?.message || error.message);
                    toast.error('Erro ao procurar produto!', { autoClose: 3000 });
                }
            };

            const getProductVariants = async () => {
                try {
                    const response = await fetchProductVariants(token, id);
                    const formattedVariants = transformProductVariants(response);
                    console.log(formattedVariants);
                    setVariants(formattedVariants);
                } catch (error) {
                    console.error('Erro ao procurar variantes do produto:', error.response?.data?.message || error.message);
                    toast.error('Erro ao procurar variantes do produto!', { autoClose: 3000 });
                }
            };

            getProduct();
            getProductVariants();
        }
    }, [id, isLogged, token]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories(token);
                setCategories(response);
            } catch (error) {
                console.error('Erro ao procurar fornecedor:', error.response.data.message || error.message);
                toast.error('Erro ao procurar fornecedor!', { autoClose: 3000 });
            }
        };
        if (isLogged) {
            getCategories();
        }
    }, [isLogged]);

    useEffect(() => {
        const getFamilies = async () => {

            try {
                const response = await fetchFamilies(token);
                setFamilies(response);
            } catch (error) {
                console.error('Erro ao procurar fornecedores:', error.response.data.message || error.message);
                toast.error('Erro ao procurar fornecedores!', { autoClose: 3000 });
            }
        };
        if (isLogged) {
            getFamilies();
        }
    }, [isLogged]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageRemoval = (image, variantIndex, imgIndex) => {
        const updatedVariants = [...variants];
        const imageToRemove = updatedVariants[variantIndex].images.splice(imgIndex, 1)[0];

        if (imageToRemove.id) {
            setImagesToDelete((prev) => [...prev, imageToRemove.id]);
        }

        setVariants(updatedVariants);
    };

    const deleteSize = (variantIndex, sizeIndex) => {
        const updated = [...variants];
        const sizeToRemove = updated[variantIndex].sizes.splice(sizeIndex, 1)[0];

        if (sizeToRemove && sizeToRemove.size) {
            setSizesToDelete((prev) => [...prev, { size: sizeToRemove.size, color: variants[variantIndex].color }]);
        }

        setVariants(updated);
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('token', token);
        formData.append('id', id);
        formData.append('type', product.type);
        formData.append('ref', product.ref);
        formData.append('quantity', product.quantity);
        formData.append('description', product.description);
        formData.append('drawer', product.drawer);
        formData.append('cx', product.cx);
        formData.append('pvp', product.pvp);
        formData.append('category', product.id_category);
        formData.append('family', product.id_family);
        formData.append('name', product.name);
        if (product.number !== null && product.number !== '') {
            formData.append('number', product.number);
        }
        formData.append('active', product.active);
        formData.append('variantsToDelete', JSON.stringify(variantsToDelete));
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        formData.append('sizesToDelete', JSON.stringify(sizesToDelete));

        variants.forEach((variant, index) => {
            formData.append(`variants[${index}][id]`, variant.id);
            formData.append(`variants[${index}][color]`, variant.color);
            formData.append(`variants[${index}][quantity]`, variant.quantity);

            variant.sizes.forEach((size, sizeIndex) => {
                formData.append(`variants[${index}][sizes][${sizeIndex}][size]`, size.size);
                formData.append(`variants[${index}][sizes][${sizeIndex}][quantity]`, size.quantity);
            });

            variant.images.forEach((image) => {
                if (image instanceof File) {
                    formData.append(`variants[${index}][images][]`, image);
                }
            });
        });

        try {
            const response = await editProduct(formData);

            setLoading(false);

            if (response === 200) {
                navigate('/inventory');
                setTimeout(() => {
                    toast.success('Produto Editado com sucesso!', { autoClose: 3000 });
                }, 500);
            } else {
                toast.error('Erro ao editar um produto!', { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Erro ao editar Produto:', error.data.message || error.message);
            toast.error('Erro ao editar um produto!', { autoClose: 3000 });
            setLoading(false);
        }
    };

    useEffect(() => {
        setHasSizes(product.id_family == 1);
    }, [product.id_family]);

    useEffect(() => {
        let totalQuantity = 0;

        variants.forEach(variant => {
            if (Array.isArray(variant.sizes) && variant.sizes.length > 0) {
                variant.sizes.forEach(size => {
                    totalQuantity += parseInt(size.quantity) || 0;
                });
            } else {
                totalQuantity += parseInt(variant.quantity) || 0;
            }
        });

        setProduct(prev => ({
            ...prev,
            quantity: totalQuantity
        }));
    }, [variants]);

    const addColor = () => {
        setVariants([...variants, { localKey: uuidv4(), id: '', color: '', sizes: hasSizes ? [{ localKey: uuidv4(), size: '', quantity: 0 }] : [], quantity: hasSizes ? product.quantity : 0, images: [] }]);
    };

    const addSize = (index) => {
        const updated = [...variants];
        if (updated[index].sizes && Array.isArray(updated[index].sizes)) {
            updated[index].sizes.push({ localKey: uuidv4(), size: '', quantity: 0 });
        } else {
            updated[index].sizes = [{ localKey: uuidv4(), size: '', quantity: 0 }];
        }
        setVariants(updated);
    };

    const handleColorChange = (index, value) => {
        const updated = [...variants];
        updated[index] = {
            ...updated[index],
            color: value
        };
        setVariants(updated);
        console.log(updated);
    };

    const handleSizeChange = (variantIndex, sizeIndex, key, value) => {
        const updated = [...variants];
        const updatedSizes = [...updated[variantIndex].sizes];

        updatedSizes[sizeIndex] = {
            ...updatedSizes[sizeIndex],
            [key]: value
        };

        updated[variantIndex] = {
            ...updated[variantIndex],
            sizes: updatedSizes
        };

        setVariants(updated);
        console.log(updated);
    };


    const deleteVariant = (variantIndex) => {
        const updated = [...variants];
        const variantToRemove = updated.splice(variantIndex, 1)[0];

        if (variantToRemove.color) {
            setVariantsToDelete((prev) => [...prev, { color: variantToRemove.color }]);
        }

        setVariants(updated);
    }

    return (
        <Layout>
            <Helmet>
                <title>Editar Produto</title>
            </Helmet>
            <h1 className="view-title">Editar Produto</h1>
            <ToastContainer />
            <div className="addProduct-container">
                <form onSubmit={submitUpdate}>
                    <div className="input-group">
                        <label htmlFor="type">Tipo: </label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={product.type}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="category">Fornecedores: </label>
                        <select
                            id="category"
                            name="id_category"
                            value={product.id_category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um Fornecedor:</option>
                            {Categories.map((category) => (
                                category.status === 1 ? (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ) : null
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="family">Família: </label>
                        <select
                            id="family"
                            name="id_family"
                            value={product.id_family}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione uma Família:</option>
                            {families.map((family) => (
                                family.status === 1 ? (
                                    <option key={family.id} value={family.id}>
                                        {family.name}
                                    </option>
                                ) : null
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Descrição: </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            cols={20}
                            value={product.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="input-group">
                        <label htmlFor="color">Variantes: </label>
                        {variants.map((variant, variantIndex) => (
                            <div key={variant.localKey} className="variant-group">
                                <div className="variant-input">
                                    <div className="variant-input-group">
                                        <label htmlFor={`color-${variant.localKey}`}>Cor: </label>
                                        <input
                                            type="text"
                                            id={`color-${variant.localKey}`}
                                            value={variant.color}
                                            onChange={(e) => handleColorChange(variantIndex, e.target.value)}
                                            required
                                        />
                                    </div>
                                    {!hasSizes && (
                                        <div className="variant-input-group">
                                            <label htmlFor={`variantQuantity-${variant.localKey}`}>Quantidade: </label>
                                            <input
                                                type="number"
                                                id={`variantQuantity-${variant.localKey}`}
                                                value={variant.quantity}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const updated = [...variants];
                                                    updated[variantIndex] = {
                                                        ...updated[variantIndex],
                                                        quantity: value,
                                                    };
                                                    setVariants(updated);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {hasSizes ? (
                                    <div className="variant-input-group">
                                        {Array.isArray(variant.sizes) && variant.sizes.length > 0 ? (
                                            variant.sizes.map((sizeItem, sizeIndex) => (
                                                <div key={sizeItem.localKey} className="input-size-group">
                                                    <div className="size-group">
                                                        <label htmlFor={`size-${variant.localKey}-${sizeItem.localKey}`}>Tamanho</label>
                                                        <input
                                                            type="text"
                                                            id={`size-${variant.localKey}-${sizeItem.localKey}`}
                                                            value={sizeItem.size}
                                                            onChange={(e) => handleSizeChange(variantIndex, sizeIndex, 'size', e.target.value)}

                                                            required
                                                        />
                                                    </div>
                                                    <div className="size-group">
                                                        <label htmlFor={`quantity-${variant.localKey}-${sizeItem.localKey}`}>Quantidade</label>
                                                        <input
                                                            type="number"
                                                            id={`quantity-${variantIndex}-${sizeIndex}`}
                                                            value={sizeItem.quantity}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                handleSizeChange(variantIndex, sizeIndex, 'quantity', value);
                                                            }}
                                                        />
                                                    </div>
                                                    {variant.sizes.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btnDeleteSize"
                                                            onClick={() => deleteSize(variantIndex, sizeIndex)}
                                                        >
                                                            x
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        ) : null}

                                        <button
                                            type="button"
                                            onClick={() => addSize(variantIndex)}
                                            className="btnAddVariantSize"
                                        >
                                            + Tamanho
                                        </button>
                                    </div>
                                ) : null}

                                <div className="image-preview-container">
                                    {variant.images.length > 0 &&
                                        variant.images.map((image, imgIndex) => (
                                            <div key={imgIndex} className="image-preview" style={{ position: 'relative' }}>
                                                <img
                                                    src={
                                                        image instanceof File
                                                            ? URL.createObjectURL(image)
                                                            : typeof image === 'string'
                                                                ? image
                                                                : image?.url
                                                    }
                                                    alt={`variant-${variantIndex}-preview-${imgIndex}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageRemoval(image, variantIndex, imgIndex)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                </div>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        const updatedVariants = [...variants];
                                        updatedVariants[variantIndex].images = [...updatedVariants[variantIndex].images, ...files];
                                        setVariants(updatedVariants);
                                    }}
                                />

                                {variants.length > 1 && (
                                    <button type="button" onClick={() => deleteVariant(variantIndex)}>x</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addColor} className="btnAddVariant">+ Cor</button>
                    </div>

                    <div className="input-group">
                        <label htmlFor="drawer">Gaveta: </label>
                        <input
                            type="text"
                            id="drawer"
                            name="drawer"
                            value={product.drawer}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="cx">Cx: </label>
                        <input
                            type="text"
                            id="cx"
                            name="cx"
                            value={product.cx}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Nome: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="number">Número: </label>
                        <input
                            type="number"
                            id="number"
                            name="number"
                            value={product.number}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="ref">Ref: </label>
                        <input
                            type="text"
                            id="ref"
                            name="ref"
                            value={product.ref}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="pvp">PVP: </label>
                        <input
                            type="number"
                            id="pvp"
                            name="pvp"
                            value={product.pvp}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="active">Estado: </label>
                        <select
                            id="active"
                            name="active"
                            value={product.active}
                            onChange={handleInputChange}
                        >
                            <option value={0}>Desativo</option>
                            <option value={1}>Ativo</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'A editar...' : 'Editar Produto'}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default StockUpdate;
