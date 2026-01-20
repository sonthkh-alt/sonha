import React from 'react';
import { Page } from '../types';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
    isLoggedIn: boolean;
}

const NavButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-300"
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ setCurrentPage, isLoggedIn }) => {
    return (
        <header className="bg-black/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-white text-xl md:text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <h1 className="text-shadow">TS. Hà Ngọc Sơn</h1>
                        <h2 className="text-sm font-normal text-gray-400">Kinh tế Biển xanh Thanh Hóa</h2>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavButton onClick={() => setCurrentPage('home')}>Trang chủ</NavButton>
                        <NavButton onClick={() => setCurrentPage('dissertation')}>Luận án Tiến sĩ</NavButton>
                        <NavButton onClick={() => setCurrentPage('research')}>Thư viện Nghiên cứu</NavButton>
                        <NavButton onClick={() => setCurrentPage('contact')}>Chi tiết liên hệ</NavButton>
                        <NavButton onClick={() => setCurrentPage('admin')}>
                            {isLoggedIn ? 'Quản trị' : 'Login Quản trị'}
                        </NavButton>
                    </nav>
                     <div className="md:hidden">
                        <select 
                            onChange={(e) => setCurrentPage(e.target.value as Page)} 
                            className="bg-gray-800 text-white p-2 rounded"
                            defaultValue="home"
                        >
                            <option value="home">Trang chủ</option>
                            <option value="dissertation">Luận án</option>
                            <option value="research">Nghiên cứu</option>
                            <option value="contact">Liên hệ</option>
                            <option value="admin">{isLoggedIn ? 'Quản trị' : 'Login'}</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;