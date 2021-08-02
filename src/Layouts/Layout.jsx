import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
    return (
        <main id="container" >
            <Navbar />
            {children}
        </main>
    )
}

export default Layout;