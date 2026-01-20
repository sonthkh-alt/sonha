import React from 'react';
import { ProfessionalActivity } from '../types';

interface HomePageProps {
    bio: string;
    avatarUrl: string;
    professionalActivities: ProfessionalActivity[];
}

// A reusable card for sections
const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-700 h-full backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-gray-200 mb-4 flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            {title}
        </h3>
        <div className="text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ bio, avatarUrl, professionalActivities }) => {
    return (
        <div className="space-y-12">
            {/* --- Section 1: Profile Intro --- */}
            <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-gray-500 flex-shrink-0">
                        <img 
                            src={avatarUrl} 
                            alt="TS. Hà Ngọc Sơn" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">Tiến sĩ Hà Ngọc Sơn</h1>
                        <p className="text-lg text-gray-300 font-semibold mb-4">Phó Chánh Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa</p>
                        <p className="text-base md:text-lg leading-relaxed text-gray-300">
                            {bio}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Section 2 & 3 Grid Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Section 2: Research Areas --- */}
                <div className="lg:col-span-1">
                    <InfoCard title="Lĩnh vực nghiên cứu" icon="🔬">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Kinh tế biển bền vững</li>
                            <li>Kinh tế xanh & Kinh tế tuần hoàn</li>
                            <li>Quản lý công & Chính sách công</li>
                            <li>Phát triển kinh tế địa phương</li>
                            <li>Mô hình kinh tế lượng ứng dụng</li>
                        </ul>
                    </InfoCard>
                </div>

                {/* --- Section 3: Featured Publications --- */}
                <div className="lg:col-span-2">
                     <InfoCard title="Công trình tiêu biểu" icon="📚">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-lg text-gray-300">Luận án Tiến sĩ</h4>
                                <p className="italic">"Phát triển kinh tế biển xanh tại tỉnh Thanh Hóa"</p>
                                <p className="text-sm text-gray-400 mt-1">Một nghiên cứu toàn diện, đề xuất hệ thống giải pháp chiến lược nhằm đưa Thanh Hóa trở thành trung tâm kinh tế biển mạnh của cả nước.</p>
                            </div>
                             <div className="border-t border-gray-600 pt-4">
                                <h4 className="font-bold text-lg text-gray-300">Bài báo khoa học</h4>
                                <p className="italic">"Các nhân tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa"</p>
                                <p className="text-sm text-gray-400 mt-1">Sử dụng phương pháp định lượng để xác định các yếu tố then chốt, cung cấp bằng chứng thực nghiệm giá trị cho các nhà hoạch định chính sách.</p>
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </div>
            
            {/* --- Section 4: Professional Activities --- */}
             <InfoCard title="Hoạt động chuyên môn" icon="🌐">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {professionalActivities.map(activity => (
                        <div key={activity.id} className="bg-gray-700/50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-200">{activity.title}</p>
                            <p className="text-sm text-gray-400">{activity.description}</p>
                        </div>
                    ))}
                </div>
            </InfoCard>

        </div>
    );
};

export default HomePage;