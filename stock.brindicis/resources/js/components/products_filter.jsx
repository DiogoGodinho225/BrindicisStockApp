import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { fetchCategories } from "../api/categoriesApi";
import { fetchFamilies } from "../api/familiesApi";

const productsFilter = ({ width, onFilterChange }) => {

    const [selectCategory, setSelectedCategory] = useState('');
    const [selectStatus, setSelectedStatus] = useState('');
    const [selectActive, setSelectedActive] = useState('');
    const [selectFamily, setSelectedFamily] = useState('');
    const [isLogged, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const [families, setFamilies] = useState([]);
    const [isLoggedInFo, setIsLoggedInFo] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const isLoggedBo = localStorage.getItem('loggedInBo');
        const isLoggedFo = localStorage.getItem('loggedInFo');

        if (isLoggedBo || isLoggedFo) {
            setIsLoggedIn(true);

            if (sessionStorage.getItem('local') === 'fo') {
                setToken(JSON.parse(localStorage.getItem('loggedInFo'))?.token);
            } else {
                setToken(JSON.parse(localStorage.getItem('loggedInBo'))?.token);
            }

            if (isLoggedFo) {
                const interval = setInterval(() => {
                    if (sessionStorage.getItem('local') === 'fo') {
                        setIsLoggedInFo(true);
                    } else {
                        setIsLoggedInFo(false);
                    }
                }, 10)
                return () => clearInterval(interval);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (isLogged) {
            const getCategories = async () => {
                try {
                    const response = await fetchCategories(token);
                    setCategories(response);
                } catch (error) {
                    toast.error('Erro ao carregar fornecedores', { autoClose: 3000 });
                    console.error('Erro na função getCategories:', error.response.data.message || error.message);
                }
            };
            getCategories();
        }
    }, [isLogged]);

    useEffect(() => {
        if (isLogged) {
            const getFamilies = async () => {
                try {
                    const response = await fetchFamilies(token);
                    setFamilies(response);
                } catch (error) {
                    toast.error('Erro ao carregar Famílias', { autoClose: 3000 });
                    console.error('Erro na função getFamilies:', error.response.data.message || error.message);
                }

            };
            getFamilies();
        }
    }, [isLogged]);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        onFilterChange({ category: newCategory, status: selectStatus, active: selectActive, family: selectFamily });
    }

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        onFilterChange({ category: selectCategory, status: newStatus, active: selectActive, family: selectFamily });
    }

    const handleActiveChange = (e) => {
        const newActive = e.target.value;
        setSelectedActive(newActive);
        onFilterChange({ category: selectCategory, status: selectStatus, active: newActive, family: selectFamily });
    }

    const handleFamilyChange = (e) => {
        const newFamily = e.target.value;
        setSelectedFamily(newFamily);
        onFilterChange({ category: selectCategory, status: selectStatus, active: selectActive, family: newFamily });
    }


    return (
        <div style={{ width }} className="products-filters">
            <div className="input-group">
                <label htmlFor="category">Fornecedor: </label>
                <select id="category" value={selectCategory} onChange={handleCategoryChange}>
                    <option value={""}>Todas</option>
                    {categories.map((category) => (
                        category.status === 1 ? (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ) :
                            null
                    ))}
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="family">Família: </label>
                <select id="family" value={selectFamily} onChange={handleFamilyChange}>
                    <option value={""}>Todas</option>
                    {families.map((family) => (
                        family.status === 1 ? (
                            <option key={family.id} value={family.id}>{family.name}</option>
                        ) :
                            null
                    ))}
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="status">Disponibilidade: </label>
                <select id="status" value={selectStatus} onChange={handleStatusChange}>
                    <option value={""}>Todos</option>
                    <option value={"1"}>Com Stock</option>
                    <option value={"2"}>Quase Esgotado</option>
                    <option value={"3"}>Esgotado</option>
                </select>
            </div>
            {!isLoggedInFo ? (
                <div className="input-group">
                    <label htmlFor="active">Estado: </label>
                    <select id="active" value={selectActive} onChange={handleActiveChange}>
                        <option value={""}>Todos</option>
                        <option value={"0"}>Desativo</option>
                        <option value={"1"}>Ativo</option>
                    </select>
                </div>
            ) : null}

        </div>
    );
}

export default productsFilter;