import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout_backoffice/layout";
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { fetchCategories } from "../../../api/categoriesApi";
import { createProduct } from "../../../api/stockApi";
import { fetchFamilies } from "../../../api/familiesApi";

const StockCreate = () => {
    const [isLogged, setIsLoggedIn] = useState(false);
    const [Categories, setCategories] = useState([]);
    const [type, setType] = useState('Stock Importado');
    const [category, setCategory] = useState('');
    const [family, setFamily] = useState('');
    const [description, setDescription] = useState('');
    const [drawer, setDrawer] = useState('');
    const [cx, setCx] = useState('');
    const [name, setName] = useState('');
    const [ref, setRef] = useState('');
    const [pvp, setPvp] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [number, setNumber] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [families, setFamilies] = useState([]);
    const [hasSizes, setHasSizes] = useState(false);
    const [variants, setVariants] = useState([{ color: '', sizes: [], quantity: 0, images: [] }]);


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

    useEffect(() => {
        const getCategories = async () => {

            try {
                const response = await fetchCategories(token);
                setCategories(response);
            } catch (error) {
                console.error('Erro ao procurar fornecedores:', error.response.data.message || error.message);
                toast.error('Erro ao procurar fornecedores!', { autoClose: 3000 });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogged) {

            setLoading(true);
            const formData = new FormData();
            formData.append('token', token);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('family', family);
            formData.append('description', description);
            formData.append('drawer', drawer);
            formData.append('cx', cx);
            formData.append('name', name);
            formData.append('ref', ref);
            formData.append('pvp', pvp);
            formData.append('quantity', quantity);
            formData.append('number', number);

            variants.forEach((variant, index) => {
                formData.append(`variants[${index}][color]`, variant.color);
                formData.append(`variants[${index}][quantity]`, variant.quantity);

                variant.sizes.forEach((size, sizeIndex) => {
                    formData.append(`variants[${index}][sizes][${sizeIndex}][size]`, size.size);
                    formData.append(`variants[${index}][sizes][${sizeIndex}][quantity]`, size.quantity);
                });

                variant.images.forEach((image) => {
                    formData.append(`variants[${index}][images][]`, image);
                });
            });

            try {

                const response = await createProduct(formData);

                if (response === 200) {
                    setLoading(false);
                    navigate('/inventory');
                    toast.success('Produto adicionado com sucesso!', { autoClose: 3000 });
                } else {
                    toast.error('Erro ao adicionar um produto!', { autoClose: 3000 });
                    setLoading(false);
                }
            } catch (error) {
                toast.error('Erro ao adicionar um produto!', { autoClose: 3000 });
                console.error('Erro ao adicionar produto:', error.response.data.message || error.message);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setHasSizes(family == 1);
    }, [family]);

    useEffect(() => {
        setVariants([{
            color: '',
            sizes: hasSizes ? [{ size: '', quantity: 0 }] : [],
            quantity: hasSizes ? 0 : 0,
            images: []
        }]);
    }, [hasSizes]);

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

        setQuantity(totalQuantity);
    }, [variants]);

    const addColor = () => {
        setVariants([...variants, { color: '', sizes: hasSizes ? [{ size: '', quantity: 0 }] : [], quantity: hasSizes ? '' : 0, images: [] }]);
    };

    const addSize = (index) => {
        const updated = [...variants];
        if (updated[index].sizes && Array.isArray(updated[index].sizes)) {
            updated[index].sizes.push({ size: '', quantity: 0 });
        } else {
            updated[index].sizes = [{ size: '', quantity: 0 }];
        }
        setVariants(updated);
    };

    const handleColorChange = (index, value) => {
        const updated = [...variants];
        updated[index].color = value;
        setVariants(updated);
    }

    const handleSizeChange = (variantIndex, sizeIndex, key, value) => {
        const updated = [...variants];
        updated[variantIndex].sizes[sizeIndex][key] = value;
        setVariants(updated);
    }

    const deleteSize = (variantIndex, sizeIndex) => {
        const updated = [...variants];
        updated[variantIndex].sizes.splice(sizeIndex, 1);
        setVariants(updated);
    }

    const deleteVariant = (variantIndex) => {
        const updated = [...variants];
        updated.splice(variantIndex, 1);
        setVariants(updated);
    }

    return (
        <Layout>
            <Helmet>
                <title>Adicionar Produto</title>
            </Helmet>
            <h1 className='view-title'>Adicionar Produto</h1>
            <div className='addProduct-container'>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="type">Tipo: </label>
                        <input type="text" id="type" value={type} required onChange={(e) => { setType(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="category">Fornecedor: </label>
                        <select id="category" value={category} onChange={(e) => { setCategory(e.target.value) }} required>
                            <option value="">Selecione um Fornecedor:</option>
                            {Categories.map((category) => (
                                category.status === 1 ? (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ) : null
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="family">Família: </label>
                        <select id="family" value={family} onChange={(e) => { setFamily(e.target.value) }} required>
                            <option value="">Selecione uma Família:</option>
                            {families.map((family) => (
                                family.status === 1 ? (
                                    <option key={family.id} value={family.id}>{family.name}</option>
                                ) : null
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Descrição: </label>
                        <textarea id="description" rows={5} cols={20} value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>

                    <div className="input-group">
                        <label htmlFor="color">Variantes: </label>
                        {variants.map((variant, variantIndex) => (
                            <div key={variantIndex} className="variant-group">
                                <div className="variant-input">
                                    <div className="variant-input-group">
                                        <label htmlFor="color">Cor: </label>
                                        <input type="text" id="color" value={variant.color} onChange={(e) => handleColorChange(variantIndex, e.target.value)} required />
                                    </div>
                                    {!hasSizes ? (
                                        <div className="variant-input-group">
                                            <label htmlFor="color">Quantidade: </label>
                                            <input type="number" id="variantQuantity" value={variant.quantity} onChange={(e) => {
                                                const updated = [...variants];
                                                updated[variantIndex].quantity = e.target.value;
                                                setVariants(updated);
                                            }} />
                                        </div>
                                    ) : null}
                                </div>

                                {hasSizes ? (
                                    <div className="variant-input-group">
                                        {Array.isArray(variant.sizes) && variant.sizes.length > 0 ? (
                                            variant.sizes.map((sizeItem, sizeIndex) => (
                                                <div key={sizeIndex} className="input-size-group">
                                                    <div className="size-group">
                                                        <label>Tamanho</label>
                                                        <input type="text" value={sizeItem.size.toUpperCase()} onChange={(e) => handleSizeChange(variantIndex, sizeIndex, 'size', e.target.value)} required />
                                                    </div>
                                                    <div className="size-group">
                                                        <label>Quantidade</label>
                                                        <input type="number" value={sizeItem.quantity} onChange={(e) => handleSizeChange(variantIndex, sizeIndex, 'quantity', e.target.value)} />
                                                    </div>
                                                    {variant.sizes && variant.sizes.length > 1 ? (<button type="button" className="btnDeleteSize" onClick={() => deleteSize(variantIndex, sizeIndex)}>x</button>) : null}
                                                </div>
                                            ))
                                        ) : null}

                                        <button type="button" onClick={() => addSize(variantIndex)} className="btnAddVariantSize">+ Tamanho</button>
                                    </div>
                                ) : null}

                                <div className="image-preview-container">
                                    {variant.images.length > 0 &&
                                        variant.images.map((image, imgIndex) => (
                                            <div key={imgIndex} className="image-preview" style={{ position: 'relative' }}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`variant-${variantIndex}-preview-${imgIndex}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedVariants = [...variants];
                                                        updatedVariants[variantIndex].images = variant.images.filter((_, i) => i !== imgIndex);
                                                        setVariants(updatedVariants);
                                                    }}
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


                                {variants.length > 1 ? (
                                    <button type="button" onClick={() => deleteVariant(variantIndex)}>x</button>
                                ) : null}

                            </div>
                        ))}
                        <button type="button" onClick={addColor} className="btnAddVariant">+ Cor</button>

                    </div>

                    <div className="input-group">
                        <label htmlFor="drawer">Gaveta: </label>
                        <input type="text" id="drawer" value={drawer} required onChange={(e) => { setDrawer(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="cx">Cx: </label>
                        <input type="text" id="cx" value={cx} required onChange={(e) => { setCx(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Nome: </label>
                        <input type="text" id="name" value={name} required onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="number">Número: </label>
                        <input type="number" id="number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="ref">Ref: </label>
                        <input type="text" id="ref" value={ref} required onChange={(e) => { setRef(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="pvp">PVP: </label>
                        <input type="number" id="pvp" value={pvp} onChange={(e) => { setPvp(e.target.value) }} />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'A criar...' : 'Adicionar Produto'}
                    </button>

                </form>
            </div >
        </Layout >
    );
};

export default StockCreate;
