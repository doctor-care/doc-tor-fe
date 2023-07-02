import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/Admin/Navbar';
import React, { useState } from 'react';
import Sidebar from '@/components/Admin/Sidebar';

function AdminLayout({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="App">
            <header className="App-header">
            <Navbar toggleSidebar={toggleSidebar} />
            </header>
            <main className="App-main">
            <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
               {children}
            </main>
        </div>
    );
}

export default AdminLayout;
