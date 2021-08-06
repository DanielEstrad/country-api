import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

const Layout = ({ children }) => {

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.toggle('dark');
        }
    }, [])

    return (
        <main id="container" >
            <Navbar />
            {children}
        </main>
    )
}

export default Layout;