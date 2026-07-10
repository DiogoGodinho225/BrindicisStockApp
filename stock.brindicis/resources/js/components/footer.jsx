import React, { useEffect, useState } from "react";

const Footer = () => {

    useEffect(() => {
        const yearElement = document.getElementById("year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }, []);

    return (
        <footer>
            <p>&copy; Brindicis <span id="year"></span></p>
        </footer>
    );
}

export default Footer;