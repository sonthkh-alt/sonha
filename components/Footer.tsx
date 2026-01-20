import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-black/50 backdrop-blur-md mt-12 py-6">
            <div className="container mx-auto px-4 text-center text-gray-400">
                <p>&copy; {currentYear} TS. Hà Ngọc Sơn. Mọi quyền được bảo lưu.</p>
                <p className="text-sm mt-1">Website được xây dựng với chủ đề "Phát triển kinh tế biển xanh tại tỉnh Thanh Hóa"</p>
            </div>
        </footer>
    );
};

export default Footer;