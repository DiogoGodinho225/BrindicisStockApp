import React, { use } from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ items, itemsPerPage, setPaginatedItems, currentPage, setCurrentPage }) => {
    const pageCount = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
        setPaginatedItems(currentItems);
    }, [items, currentPage, itemsPerPage, setPaginatedItems]);

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            setCurrentPage(prevPage => prevPage + 1);
        }

        var itemsBo = document.querySelector('.content-backoffice-container');
        var itemsProducts = document.querySelector('.products');
        if (itemsBo) {
            itemsBo.scrollTop = 0;
        } else if (itemsProducts) {
            itemsProducts.scrollTop = 0;
        }

    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }

        var itemsBo = document.querySelector('.content-backoffice-container');
        var itemsProducts = document.querySelector('.products');
        if (itemsBo) {
            itemsBo.scrollTop = 0;
        } else if (itemsProducts) {
            itemsProducts.scrollTop = 0;
        }
    };

    return (
        <>
            {items.length > itemsPerPage ? (
                <>
                    {currentPage > 1 ? (<button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        <FaArrowLeft />
                    </button>) : null}
                    <span>{`${currentPage}/${pageCount}`}</span>
                    {currentPage < pageCount ? (
                        <button onClick={handleNextPage} disabled={currentPage === pageCount}>
                            <FaArrowRight />
                        </button>
                    ) : null}
                </>
            ) : null}
        </>
    );
}

export default Pagination;