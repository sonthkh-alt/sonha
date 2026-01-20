import React from 'react';
import { Paper } from '../types';

interface PaperCardProps {
    paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
    return (
        <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full flex flex-col transition-transform transform hover:-translate-y-1 duration-300">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-100 mb-3">{paper.title}</h3>
                <p className="text-gray-300 leading-relaxed">{paper.summary}</p>
            </div>
            <div className="p-6 bg-gray-900/50">
                <a
                    href={paper.fileUrl}
                    download
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-300"
                >
                    Đọc / Tải về
                </a>
            </div>
        </div>
    );
};

export default PaperCard;