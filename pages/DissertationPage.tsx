import React from 'react';
import { Dissertation } from '../types';

interface DissertationPageProps {
    dissertation: Dissertation;
}

const DissertationPage: React.FC<DissertationPageProps> = ({ dissertation }) => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-400">LUẬN ÁN TIẾN SĨ</h3>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100 my-4">{dissertation.title}</h1>
            </div>
            
            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4 border-b-2 border-gray-500 pb-2">Tóm tắt luận án</h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
                    {dissertation.summary}
                </p>
            </div>
            
            <div className="text-center mt-12">
                <a
                    href={dissertation.fileUrl}
                    download
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                >
                    Tải về Luận án (PDF)
                </a>
            </div>
        </div>
    );
};

export default DissertationPage;