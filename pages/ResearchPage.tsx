import React from 'react';
import { Paper } from '../types';
import PaperCard from '../components/PaperCard';

interface ResearchPageProps {
    papers: Paper[];
}

const ResearchPage: React.FC<ResearchPageProps> = ({ papers }) => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Thư viện Nghiên cứu Khoa học</h1>
                <p className="text-lg text-gray-400 mt-2">Các công trình đã được công bố của TS. Hà Ngọc Sơn</p>
            </div>
            
            {papers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {papers.map(paper => (
                        <PaperCard key={paper.id} paper={paper} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Chưa có bài báo nào.</p>
            )}
        </div>
    );
};

export default ResearchPage;