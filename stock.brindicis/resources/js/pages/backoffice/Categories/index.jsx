import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/layout_backoffice/layout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { createCategory, editCategory, fetchCategories } from '../../../api/categoriesApi';
import Pagination from '../../../components/pagination';


const CategoriesIndex = () => {

    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [CategoryName, setCategoryName] = useState('');
    const [category, setCategory] = useState({
        id: null,
        CategoryName: '',
        status: 1,
    });
    const [searchItem, setSearchItem] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [token, setToken] = useState('');
    const [paginatedCategories, setPaginatedCategories] = useState([]);

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
        if (isLoggedIn) {

            try {
                const response = await fetchCategories(token);

                setCategories(response);
                setFilteredCategories(response);
            } catch (error) {
                setError('Erro ao ir buscar os fornecedores.');
                console.error('Erro na função getTableData Categorias: ', error.response.data.message || error.message);
                toast.error('Erro ao tentar buscar os fornecedores!', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowEditModal(false);
    };

    const handleNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearchItem = (newSearchItem) => {
        setSearchItem(newSearchItem);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoggedIn) return;

        try {
            let response;

            if (!showEditModal) {
                setLoading(true);
                response = await createCategory(token, CategoryName);

                if (response.status === 200) {
                    toast.success('Fornecedor adicionado com sucesso!', { autoClose: 3000 });
                    closeModal();
                    getTableData();
                    setCategoryName('');
                } else {
                    toast.error('Erro ao criar um fornecedor!', { autoClose: 3000 });
                }

                setLoading(false);

            } else {
                setLoading(true);
                response = await editCategory(token, category);

                if (response.status === 200) {
                    toast.success('Fornecedor editado com sucesso!', { autoClose: 3000 });
                    closeModal();
                    setShowEditModal(false);
                    getTableData();
                } else {
                    toast.error('Erro ao editar fornecedor!', { autoClose: 3000 });
                }
                setLoading(false);
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro. Tente novamente.');
            }

            console.error('Erro na função handleSubmit: ', error.response.data.message || error.message);
            toast.error('Erro ao tentar criar ou editar fornecedor!', { autoClose: 3000 });
        }
    };

    const handleDelete = async (CategoryId) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja eliminar este fornecedor?');

        if (isLoggedIn) {

            if (confirmDelete) {
                try {

                    const response = await axios.delete('/api/delete-category', {
                        data: {
                            token: token,
                            id: CategoryId
                        }
                    });

                    if (response.status === 200) {
                        if (response.data.error) {
                            toast.error(response.data.error, { autoClose: 3000 });
                        } else {
                            toast.success('Fornecedor deletado com sucesso!', { autoClose: 3000 });
                            getTableData();
                        }

                    } else {
                        toast.error('Erro ao deletar fornecedor!', { autoClose: 3000 });
                    }
                } catch (error) {
                    toast.error('Erro ao tentar deletar fornecedor!', { autoClose: 3000 });
                    console.error('Erro ma função handleDelete: ', error.response.data.message || error.message);

                }
            } else {
                toast.info('Exclusão cancelada.', { autoClose: 2000 });
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {

            getTableData();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setCurrentPage(1);
        if (searchItem === '') {
            setFilteredCategories(Categories);
        } else {
            const filtered = Categories.filter((category) =>
                category.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchItem, Categories]);


    return (
        <Layout searchItem={searchItem} setSearchItem={handleSearchItem}>
            <Helmet>
                <title>Categorias</title>
            </Helmet>
            <h1 className='view-title'>Gestão de Fornecedores</h1>
            <div className='categories-container'>
                <ToastContainer />
                <button onClick={openModal} className='btnAddCategory'>Adicionar Fornecedor</button>
                <table>
                    <thead>
                        <tr>
                            <th className="table-title" colSpan="3">
                                Fornecedor
                            </th>
                        </tr>
                        <tr>
                            <th>Fornecedor</th>
                            <th>status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3">A carregar dados...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="3">{error}</td>
                            </tr>
                        ) : paginatedCategories.length === 0 ? (
                            <tr>
                                <td colSpan="3">Sem Fornecedores disponíveis</td>
                            </tr>
                        ) : (
                            paginatedCategories.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td><span style={{
                                        backgroundColor: item.status === 1 ? 'green' : 'red',

                                    }}>{item.status === 1 ? 'Ativo' : 'Desativo'}</span></td>
                                    <td className='cell-btns'>
                                        <button onClick={() => {
                                            setShowEditModal(true); openModal(); setCategory({
                                                id: item.id,
                                                name: item.name,
                                                status: item.status
                                            });
                                        }} className='btnEditCat'>Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className='btnDelCat'>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <p style={{ float: 'left' }}>A mostrar {filteredCategories.length} fornecedores...</p>
                    <Pagination items={filteredCategories} itemsPerPage={itemsPerPage} setPaginatedItems={setPaginatedCategories} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>

            </div>
            {showModal ? (
                <>
                    <div className="modal-overlay"></div>
                    <div className='categories-modal'>
                        <button type="button" onClick={closeModal}><FaTimes /></button>
                        <h2>{showEditModal == false ? 'Adicionar Novo Fornecedor: ' : 'Editar Fornecedor'}</h2>
                        <form onSubmit={handleSubmit}>
                            {showEditModal == false ? (
                                <>
                                    <label htmlFor="inputNameCat">Nome do fornecedor: </label>
                                    <input
                                        id="inputNameCat"
                                        type='text'
                                        value={CategoryName}
                                        onChange={handleNameChange}
                                        placeholder='Insira o nome do fornecedor'
                                        required
                                    />
                                </>
                            ) : (
                                <>
                                    <label htmlFor="inputNameCat">Nome do fornecedor: </label>
                                    <input
                                        id="inputNameCat"
                                        type='text'
                                        name='name'
                                        value={category.name}
                                        onChange={handleChange}
                                        placeholder='Insira o nome do fornecedor'
                                        required
                                    />
                                    <label htmlFor='categoryStatus'>Estado: </label>
                                    <select
                                        id="categoryStatus"
                                        name="status"
                                        value={category.status}
                                        onChange={handleChange}
                                    >
                                        <option value={1}>Ativo</option>
                                        <option value={0}>Desativo</option>
                                    </select>
                                </>
                            )}
                            <button disabled={loading} type="submit">
                                {loading
                                    ? showEditModal ? 'A editar...' : 'A criar...'
                                    : showEditModal ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
                            </button>

                        </form>

                    </div>
                </>
            ) : null}
        </Layout>
    );

}

export default CategoriesIndex