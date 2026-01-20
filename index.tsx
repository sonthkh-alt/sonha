// --- MERGED IMPORTS ---
import React, { useState, createContext, useContext, ReactNode, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- FROM types.ts ---
interface Paper {
  id: string;
  title: string;
  summary: string;
  fileUrl: string;
}

interface Dissertation {
  title: string;
  summary: string;
  fileUrl: string;
}

interface ContactInfo {
    workplace: string;
    address: string;
    email: string;
    phone: string;
    mapUrl: string;
}

interface ProfessionalActivity {
    id: string;
    title: string;
    description: string;
}

type Page = 'home' | 'dissertation' | 'research' | 'admin' | 'contact';


// --- FROM hooks/usePortfolioData.ts ---
// The custom hook and data provider logic, now part of the main file.

const STORAGE_KEY = 'portfolioData_tsHaNgocSon';

const INITIAL_BIO = "TS. Hà Ngọc Sơn là một nhà lãnh đạo và chuyên gia uyên bác trong lĩnh vực Quản lý Kinh tế. Với học vị Tiến sĩ, ông hiện đang giữ chức vụ Phó Chánh Văn phòng Đoàn Đại biểu Quốc hội và Hội đồng Nhân dân tỉnh Thanh Hóa. Ông có niềm đam mê sâu sắc với việc phát triển kinh tế biển bền vững, đặc biệt là tại quê hương Thanh Hóa, nơi ông đã và đang cống hiến trí tuệ và tâm huyết của mình.";
const INITIAL_DISSERTATION: Dissertation = {
  title: "Phát triển kinh tế biển xanh tại tỉnh Thanh Hóa",
  summary: "Luận án đi sâu phân tích toàn diện thực trạng, tiềm năng và thách thức trong việc phát triển kinh tế biển tại tỉnh Thanh Hóa theo hướng bền vững. Dựa trên nền tảng lý luận về kinh tế xanh và kinh nghiệm quốc tế, luận án đề xuất một hệ thống các giải pháp chiến lược đồng bộ, từ chính sách vĩ mô đến các mô hình kinh doanh cụ thể, nhằm khai thác hiệu quả tiềm năng biển, bảo vệ môi trường sinh thái và nâng cao đời sống người dân, đưa Thanh Hóa trở thành một trung tâm kinh tế biển mạnh của cả nước.",
  fileUrl: "./luan_an_ts_ha_ngoc_son.pdf"
};
const INITIAL_PAPERS: Paper[] = [
  { id: '1', title: "Một số giải pháp nhằm phát triển kinh tế biển theo hướng xanh tại tỉnh Thanh Hóa", summary: "Bài báo tập trung vào việc đề xuất các giải pháp thực tiễn, có tính khả thi cao để chuyển đổi mô hình kinh tế biển Thanh Hóa. Các giải pháp bao gồm việc hoàn thiện cơ chế chính sách, thu hút đầu tư xanh, phát triển nguồn nhân lực chất lượng cao và ứng dụng công nghệ sạch trong các ngành kinh tế biển chủ lực như du lịch, thủy sản và logistics.", fileUrl: "./bai_bao_1.pdf" },
  { id: '2', title: "Mô hình nghiên cứu các nhân tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa", summary: "Nghiên cứu xây dựng một mô hình lý thuyết toàn diện, xác định các nhân tố cốt lõi tác động đến sự phát triển kinh tế biển xanh tại Thanh Hóa, bao gồm: thể chế, nguồn vốn, công nghệ, nhân lực và nhận thức. Bài báo là cơ sở khoa học cho các nghiên cứu định lượng sâu hơn.", fileUrl: "./bai_bao_2.pdf" },
  { id: '3', title: "Các nhân tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa", summary: "Bài viết này là phần tiếp theo, trình bày kết quả phân tích định lượng dựa trên mô hình đã đề xuất. Kết quả chỉ ra rằng nguồn nhân lực và thể chế chính sách là hai yếu tố có tác động mạnh mẽ nhất, từ đó đưa ra các hàm ý quản trị quan trọng cho tỉnh.", fileUrl: "./bai_bao_3.pdf" },
  { id: '4', title: "Ứng dụng mô hình hồi quy trong phân tích các yếu tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa", summary: "Công trình sử dụng mô hình hồi quy tuyến tính để phân tích dữ liệu khảo sát từ các doanh nghiệp, lượng hóa mức độ ảnh hưởng của từng yếu tố đến sự phát triển kinh tế biển xanh. Kết quả khẳng định vai trò then chốt của nguồn nhân lực và hạ tầng, cung cấp bằng chứng thực nghiệm giá trị.", fileUrl: "./bai_bao_4.pdf" },
];
const INITIAL_AVATAR_URL = "https://picsum.photos/300/300?grayscale";
const INITIAL_CONTACT_INFO: ContactInfo = {
    workplace: "Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa",
    address: "Số 01, Đại lộ Lê Lợi, Phường Lam Sơn, TP. Thanh Hóa, Tỉnh Thanh Hóa",
    email: "son.hn@thanhhoa.gov.vn",
    phone: "(+84) 123 456 789 (Vui lòng chỉ liên hệ trong giờ hành chính)",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.579626359424!2d105.77421881538309!3d19.80550478665091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f81dd1aaaaab%3A0x4858cb339c4a851d!2zVMOyYSBuaMOgIEjhu5lpIMSR4buTbmcgTmjDom4gZMJuIFThu4luaCBUaGFuaCBIRCVDMyVCM2E!5e0!3m2!1svi!2s!4v1689234567890!5m2!1svi!2s"
};
const INITIAL_ACTIVITIES: ProfessionalActivity[] = [
    { id: '1', title: "Tư vấn chính sách", description: "Tham gia tư vấn cho các cơ quan địa phương về chiến lược phát triển kinh tế - xã hội." },
    { id: '2', title: "Hội thảo khoa học", description: "Trình bày báo cáo tại các hội thảo khoa học trong nước và quốc tế." },
    { id: '3', title: "Giảng dạy & Hướng dẫn", description: "Thỉnh giảng tại các trường đại học và hướng dẫn sinh viên, học viên cao học." }
];

interface DataContextType {
    bio: string; dissertation: Dissertation; papers: Paper[]; isLoggedIn: boolean;
    login: (password: string) => boolean; logout: () => void;
    updateBio: (newBio: string) => void; updateDissertation: (newDissertation: Dissertation) => void;
    setPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
    avatarUrl: string; contactInfo: ContactInfo; professionalActivities: ProfessionalActivity[];
    updateAvatarUrl: (newUrl: string) => void; updateContactInfo: (newInfo: ContactInfo) => void;
    setProfessionalActivities: React.Dispatch<React.SetStateAction<ProfessionalActivity[]>>;
    restoreData: (data: any) => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loadState = <T,>(key: string, defaultValue: T): T => {
        try {
            const savedItem = localStorage.getItem(STORAGE_KEY);
            if (savedItem) { const parsedData = JSON.parse(savedItem); return parsedData[key] ?? defaultValue; }
        } catch (error) { console.error(`Error reading ${key} from localStorage`, error); }
        return defaultValue;
    };
    const [bio, setBio] = useState<string>(() => loadState('bio', INITIAL_BIO));
    const [dissertation, setDissertation] = useState<Dissertation>(() => loadState('dissertation', INITIAL_DISSERTATION));
    const [papers, setPapers] = useState<Paper[]>(() => loadState('papers', INITIAL_PAPERS));
    const [avatarUrl, setAvatarUrl] = useState<string>(() => loadState('avatarUrl', INITIAL_AVATAR_URL));
    const [contactInfo, setContactInfo] = useState<ContactInfo>(() => loadState('contactInfo', INITIAL_CONTACT_INFO));
    const [professionalActivities, setProfessionalActivities] = useState<ProfessionalActivity[]>(() => loadState('professionalActivities', INITIAL_ACTIVITIES));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const dataToSave = { bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        } catch (error) { console.error("Error saving data to localStorage", error); }
    }, [bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities]);

    const login = useCallback((password: string) => { if (password === 'admin') { setIsLoggedIn(true); return true; } return false; }, []);
    const logout = useCallback(() => { setIsLoggedIn(false); }, []);
    const updateBio = (newBio: string) => setBio(newBio);
    const updateDissertation = (newDissertation: Dissertation) => setDissertation(newDissertation);
    const updateAvatarUrl = (newUrl: string) => setAvatarUrl(newUrl);
    const updateContactInfo = (newInfo: ContactInfo) => setContactInfo(newInfo);
    const restoreData = useCallback((data: any) => {
        if (data.bio) setBio(data.bio);
        if (data.dissertation) setDissertation(data.dissertation);
        if (data.papers) setPapers(data.papers);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
        if (data.contactInfo) setContactInfo(data.contactInfo);
        if (data.professionalActivities) setProfessionalActivities(data.professionalActivities);
    }, []);

    const value = { bio, dissertation, papers, isLoggedIn, login, logout, updateBio, updateDissertation, setPapers, avatarUrl, contactInfo, professionalActivities, updateAvatarUrl, updateContactInfo, setProfessionalActivities, restoreData };
    return React.createElement(DataContext.Provider, { value }, children);
};

const usePortfolioData = () => {
    const context = useContext(DataContext);
    if (context === undefined) { throw new Error('usePortfolioData must be used within a DataProvider'); }
    return context;
};

// --- FROM components/Footer.tsx ---
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

// --- FROM components/PaperCard.tsx ---
const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => {
    return (
        <div className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full flex flex-col transition-transform transform hover:-translate-y-1 duration-300">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-100 mb-3">{paper.title}</h3>
                <p className="text-gray-300 leading-relaxed">{paper.summary}</p>
            </div>
            <div className="p-6 bg-gray-900/50">
                <a href={paper.fileUrl} download className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-300">Đọc / Tải về</a>
            </div>
        </div>
    );
};

// --- FROM components/Header.tsx ---
const Header: React.FC<{ setCurrentPage: (page: Page) => void; isLoggedIn: boolean; }> = ({ setCurrentPage, isLoggedIn }) => {
    const NavButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
        <button onClick={onClick} className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-300">{children}</button>
    );
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
                        <NavButton onClick={() => setCurrentPage('admin')}>{isLoggedIn ? 'Quản trị' : 'Login Quản trị'}</NavButton>
                    </nav>
                     <div className="md:hidden">
                        <select onChange={(e) => setCurrentPage(e.target.value as Page)} className="bg-gray-800 text-white p-2 rounded" defaultValue="home">
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

// --- FROM pages/ContactPage.tsx ---
const ContactPage: React.FC<{ contactInfo: ContactInfo }> = ({ contactInfo }) => {
    const ContactInfoItem: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center"><span className="text-2xl">{icon}</span></div>
            <div>
                <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                <div className="text-gray-300">{children}</div>
            </div>
        </div>
    );
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Thông tin liên hệ</h1>
                <p className="text-lg text-gray-400 mt-2">Thông tin chính thức để liên hệ công tác và trao đổi học thuật.</p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <ContactInfoItem icon="🏢" title="Nơi công tác"><p className="font-bold">{contactInfo.workplace}</p><p>{contactInfo.address}</p></ContactInfoItem>
                    <ContactInfoItem icon="📧" title="Email học thuật"><a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:underline">{contactInfo.email}</a></ContactInfoItem>
                     <ContactInfoItem icon="📞" title="Điện thoại"><p>{contactInfo.phone}</p></ContactInfoItem>
                </div>
                <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-[300px] overflow-hidden">
                     <iframe src={contactInfo.mapUrl} width="100%" height="100%" className="filter grayscale(1)" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
};

// --- FROM pages/DissertationPage.tsx ---
const DissertationPage: React.FC<{ dissertation: Dissertation }> = ({ dissertation }) => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-400">LUẬN ÁN TIẾN SĨ</h3>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100 my-4">{dissertation.title}</h1>
            </div>
            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4 border-b-2 border-gray-500 pb-2">Tóm tắt luận án</h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">{dissertation.summary}</p>
            </div>
            <div className="text-center mt-12">
                <a href={dissertation.fileUrl} download className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">Tải về Luận án (PDF)</a>
            </div>
        </div>
    );
};

// --- FROM pages/ResearchPage.tsx ---
const ResearchPage: React.FC<{ papers: Paper[] }> = ({ papers }) => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Thư viện Nghiên cứu Khoa học</h1>
                <p className="text-lg text-gray-400 mt-2">Các công trình đã được công bố của TS. Hà Ngọc Sơn</p>
            </div>
            {papers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">{papers.map(paper => (<PaperCard key={paper.id} paper={paper} />))}</div>
            ) : (<p className="text-center text-gray-500">Chưa có bài báo nào.</p>)}
        </div>
    );
};

// --- FROM pages/HomePage.tsx ---
const HomePage: React.FC<{ bio: string; avatarUrl: string; professionalActivities: ProfessionalActivity[]; }> = ({ bio, avatarUrl, professionalActivities }) => {
    const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-700 h-full backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-200 mb-4 flex items-center"><span className="text-3xl mr-3">{icon}</span>{title}</h3>
            <div className="text-gray-300 space-y-2">{children}</div>
        </div>
    );
    return (
        <div className="space-y-12">
            <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-gray-500 flex-shrink-0">
                        <img src={avatarUrl} alt="TS. Hà Ngọc Sơn" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">Tiến sĩ Hà Ngọc Sơn</h1>
                        <p className="text-lg text-gray-300 font-semibold mb-4">Phó Chánh Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa</p>
                        <p className="text-base md:text-lg leading-relaxed text-gray-300">{bio}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <InfoCard title="Lĩnh vực nghiên cứu" icon="🔬">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Kinh tế biển bền vững</li><li>Kinh tế xanh & Kinh tế tuần hoàn</li><li>Quản lý công & Chính sách công</li><li>Phát triển kinh tế địa phương</li><li>Mô hình kinh tế lượng ứng dụng</li>
                        </ul>
                    </InfoCard>
                </div>
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

// --- FROM pages/AdminPage.tsx ---
interface AdminPageProps {
    isLoggedIn: boolean; login: (password: string) => boolean; logout: () => void; bio: string; updateBio: (newBio: string) => void; dissertation: Dissertation; updateDissertation: (newDissertation: Dissertation) => void; papers: Paper[]; setPapers: React.Dispatch<React.SetStateAction<Paper[]>>; restoreData: (data: any) => void; avatarUrl: string; updateAvatarUrl: (newUrl: string) => void; contactInfo: ContactInfo; updateContactInfo: (newInfo: ContactInfo) => void; professionalActivities: ProfessionalActivity[]; setProfessionalActivities: React.Dispatch<React.SetStateAction<ProfessionalActivity[]>>;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger'; }> = ({ children, className, variant = 'primary', ...rest }) => {
        const baseClasses = 'px-4 py-2 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
        const variantClasses = { primary: 'bg-gray-700 text-white hover:bg-gray-600', secondary: 'bg-gray-500 text-white hover:bg-gray-400', danger: 'bg-red-600 text-white hover:bg-red-700' };
        return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>{children}</button>;
    };
    const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => <input className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" {...props} />;
    const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" rows={5} {...props} />;

    const LoginForm: React.FC<{ onLogin: (password: string) => boolean; }> = ({ onLogin }) => {
        const [password, setPassword] = useState(''); const [error, setError] = useState('');
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault(); setError(''); if (!onLogin(password)) { setError('Mật khẩu không đúng. Vui lòng thử lại.'); }
        };
        return (
            <div className="max-w-md mx-auto bg-gray-900/70 p-8 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
                <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Đăng nhập Quản trị</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label className="block text-gray-300 mb-2" htmlFor="username">Tài khoản</label><Input id="username" type="text" value="admin" readOnly className="bg-gray-700" /></div>
                    <div className="mb-6"><label className="block text-gray-300 mb-2" htmlFor="password">Mật khẩu</label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu là 'admin'" required /></div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <Button type="submit" className="w-full">Đăng nhập</Button>
                </form>
            </div>
        );
    };

    const AdminDashboard: React.FC<AdminPageProps> = ({ logout, bio, updateBio, dissertation, updateDissertation, papers, setPapers, restoreData, avatarUrl, updateAvatarUrl, contactInfo, updateContactInfo, professionalActivities, setProfessionalActivities }) => {
        
        const AvatarEditor: React.FC<{ avatarUrl: string; onSave: (newUrl: string) => void; }> = ({ avatarUrl, onSave }) => {
            const [previewUrl, setPreviewUrl] = useState<string | null>(null); const fileInputRef = useRef<HTMLInputElement>(null);
            const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => { setPreviewUrl(reader.result as string); }; reader.readAsDataURL(file); } };
            const handleSave = () => { if (previewUrl) { onSave(previewUrl); setPreviewUrl(null); alert("Ảnh đại diện đã được cập nhật."); } };
            return (
                <div className="space-y-4"><h3 className="text-xl font-semibold text-gray-200">Ảnh đại diện</h3><div className="flex items-center gap-6"><img src={previewUrl || avatarUrl} alt="Ảnh đại diện" className="w-32 h-32 rounded-full object-cover border-2 border-gray-600" /><div className="flex-grow"><Button onClick={() => fileInputRef.current?.click()}>Chọn ảnh mới</Button> <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />{previewUrl && <Button onClick={handleSave} className="ml-4">Lưu ảnh</Button>} <p className="text-sm text-gray-400 mt-2">Chọn một file ảnh (JPG, PNG,...) để làm ảnh đại diện mới.</p></div></div></div>
            );
        };
        const BioEditor: React.FC<{ bio: string; onSave: (newBio: string) => void; }> = ({ bio, onSave }) => {
            const [currentBio, setCurrentBio] = useState(bio); const handleSave = () => { onSave(currentBio); alert('Tiểu sử đã được cập nhật.'); };
            return (<div className="space-y-4"><h3 className="text-xl font-semibold text-gray-200">Tiểu sử</h3><Textarea value={currentBio} onChange={(e) => setCurrentBio(e.target.value)} rows={8} /><Button onClick={handleSave}>Lưu tiểu sử</Button></div>);
        };
        const DissertationEditor: React.FC<{ dissertation: Dissertation; onSave: (newDissertation: Dissertation) => void; }> = ({ dissertation, onSave }) => {
            const [formData, setFormData] = useState(dissertation); const handleSave = () => { onSave(formData); alert('Thông tin luận án đã được cập nhật.'); };
            return (
                <div className="space-y-4"><h3 className="text-xl font-semibold text-gray-200">Luận án Tiến sĩ</h3><div className="space-y-2"><label className="block text-sm font-medium text-gray-300 mb-1">Tiêu đề</label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div><div className="space-y-2"><label className="block text-sm font-medium text-gray-300 mb-1">Tóm tắt</label><Textarea value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})} rows={8} /></div><Button onClick={handleSave}>Lưu luận án</Button></div>
            );
        };
        const ContactEditor: React.FC<{ contactInfo: ContactInfo; onSave: (newInfo: ContactInfo) => void; }> = ({ contactInfo, onSave }) => {
            const [formData, setFormData] = useState(contactInfo);
            const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
            const handleSave = () => { onSave(formData); alert('Thông tin liên hệ đã được cập nhật.'); }
            return (
                <div className="space-y-4"><h3 className="text-xl font-semibold text-gray-200">Thông tin liên hệ</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-300 mb-1">Nơi công tác</label><Input name="workplace" value={formData.workplace} onChange={handleChange} /></div><div><label className="block text-sm font-medium text-gray-300 mb-1">Địa chỉ</label><Input name="address" value={formData.address} onChange={handleChange} /></div><div><label className="block text-sm font-medium text-gray-300 mb-1">Email</label><Input name="email" type="email" value={formData.email} onChange={handleChange} /></div><div><label className="block text-sm font-medium text-gray-300 mb-1">Điện thoại</label><Input name="phone" value={formData.phone} onChange={handleChange} /></div></div><div><label className="block text-sm font-medium text-gray-300 mb-1">URL nhúng Google Maps</label><Textarea name="mapUrl" value={formData.mapUrl} onChange={handleChange} rows={4} /></div><Button onClick={handleSave}>Lưu thông tin liên hệ</Button></div>
            );
        };
        const PaperManager: React.FC<{ papers: Paper[]; setPapers: React.Dispatch<React.SetStateAction<Paper[]>>; }> = ({ papers, setPapers }) => {
            const [editingPaper, setEditingPaper] = useState<Paper | null>(null); const [isCreating, setIsCreating] = useState(false);
            const handleSave = (paperToSave: Paper) => { if (isCreating) { setPapers(prev => [...prev, { ...paperToSave, id: new Date().toISOString() }]); } else { setPapers(prev => prev.map(p => p.id === paperToSave.id ? paperToSave : p)); } setEditingPaper(null); setIsCreating(false); };
            const handleDelete = (id: string) => { if (window.confirm('Bạn có chắc chắn muốn xóa bài báo này không?')) { setPapers(prev => prev.filter(p => p.id !== id)); } };
            const handleAddNew = () => { setIsCreating(true); setEditingPaper({ id: '', title: '', summary: '', fileUrl: '' }); };
            const PaperForm: React.FC<{ paper: Paper; onSave: (paper: Paper) => void; onCancel: () => void; }> = ({ paper, onSave, onCancel }) => {
                const [formData, setFormData] = useState(paper);
                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) { setFormData(prev => ({ ...prev, fileUrl: `./${e.target.files![0].name}` })); } };
                const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
                return (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-gray-100">{paper.id ? 'Sửa bài báo' : 'Thêm bài báo mới'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-gray-300">Tiêu đề</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div><div><label className="block text-gray-300">Tóm tắt</label><Textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} required /></div><div><label className="block text-gray-300">Tải file PDF</label><Input type="file" accept=".pdf" onChange={handleFileChange} /><p className="text-sm text-gray-400 mt-1">File hiện tại: {formData.fileUrl}</p></div><div className="flex justify-end space-x-2"><Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button><Button type="submit">Lưu</Button></div></form></div></div>
                );
            };
            return (
                <div className="space-y-4"><div className="flex justify-between items-center"><h3 className="text-xl font-semibold text-gray-200">Quản lý Bài báo Khoa học</h3><Button onClick={handleAddNew}>Thêm bài báo mới</Button></div><div className="space-y-4">{papers.map(paper => (<div key={paper.id} className="bg-gray-800 p-4 rounded-md flex justify-between items-start"><div><p className="font-bold text-gray-200">{paper.title}</p><p className="text-sm text-gray-400 truncate max-w-md">{paper.summary}</p></div><div className="flex space-x-2 flex-shrink-0 ml-4"><Button variant="secondary" onClick={() => { setIsCreating(false); setEditingPaper(paper); }}>Sửa</Button><Button variant="danger" onClick={() => handleDelete(paper.id)}>Xóa</Button></div></div>))}</div>{editingPaper && <PaperForm paper={editingPaper} onSave={handleSave} onCancel={() => setEditingPaper(null)} />}</div>
            );
        };
        const ActivityManager: React.FC<{ activities: ProfessionalActivity[]; setActivities: React.Dispatch<React.SetStateAction<ProfessionalActivity[]>>; }> = ({ activities, setActivities }) => {
            const [editingActivity, setEditingActivity] = useState<ProfessionalActivity | null>(null); const [isCreating, setIsCreating] = useState(false);
            const handleSave = (activityToSave: ProfessionalActivity) => { if (isCreating) { setActivities(prev => [...prev, { ...activityToSave, id: new Date().toISOString() }]); } else { setActivities(prev => prev.map(a => a.id === activityToSave.id ? activityToSave : a)); } setEditingActivity(null); setIsCreating(false); };
            const handleDelete = (id: string) => { if (window.confirm('Bạn có chắc chắn muốn xóa hoạt động này không?')) { setActivities(prev => prev.filter(a => a.id !== id)); } };
            const handleAddNew = () => { setIsCreating(true); setEditingActivity({ id: '', title: '', description: '' }); };
            const ActivityForm: React.FC<{ activity: ProfessionalActivity; onSave: (activity: ProfessionalActivity) => void; onCancel: () => void; }> = ({ activity, onSave, onCancel }) => {
                const [formData, setFormData] = useState(activity); const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
                return (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-gray-100">{activity.id ? 'Sửa hoạt động' : 'Thêm hoạt động mới'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-gray-300">Tiêu đề</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div><div><label className="block text-gray-300">Mô tả</label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div><div className="flex justify-end space-x-2"><Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button><Button type="submit">Lưu</Button></div></form></div></div>
                );
            };
            return (
                <div className="space-y-4"><div className="flex justify-between items-center"><h3 className="text-xl font-semibold text-gray-200">Quản lý Hoạt động chuyên môn</h3><Button onClick={handleAddNew}>Thêm hoạt động mới</Button></div><div className="space-y-4">{activities.map(activity => (<div key={activity.id} className="bg-gray-800 p-4 rounded-md flex justify-between items-start"><div><p className="font-bold text-gray-200">{activity.title}</p><p className="text-sm text-gray-400">{activity.description}</p></div><div className="flex space-x-2 flex-shrink-0 ml-4"><Button variant="secondary" onClick={() => { setIsCreating(false); setEditingActivity(activity); }}>Sửa</Button><Button variant="danger" onClick={() => handleDelete(activity.id)}>Xóa</Button></div></div>))}</div>{editingActivity && <ActivityForm activity={editingActivity} onSave={handleSave} onCancel={() => setEditingActivity(null)} />}</div>
            );
        };
        const BackupRestore: React.FC<{ bio: string; dissertation: Dissertation; papers: Paper[]; avatarUrl: string; contactInfo: ContactInfo; professionalActivities: ProfessionalActivity[]; restoreData: (data: any) => void; }> = ({ bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities, restoreData }) => {
            const fileInputRef = useRef<HTMLInputElement>(null);
            const handleBackup = useCallback(() => { const data = { bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities }; const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`; const link = document.createElement("a"); link.href = jsonString; link.download = `backup_ts_ha_ngoc_son_${new Date().toISOString().split('T')[0]}.json`; link.click(); }, [bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities]);
            const handleRestoreClick = () => { fileInputRef.current?.click(); };
            const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = (e) => { try { const text = e.target?.result; if (typeof text === 'string') { const data = JSON.parse(text); restoreData(data); alert('Khôi phục dữ liệu thành công!'); } } catch (error) { alert('Lỗi: File sao lưu không hợp lệ.'); } }; reader.readAsText(file); }
            };
            return (
                <div className="space-y-4"><h3 className="text-xl font-semibold text-gray-200">Sao lưu & Khôi phục</h3><p className="text-gray-400">Lưu trữ toàn bộ dữ liệu website hoặc khôi phục từ một file sao lưu.</p><div className="flex space-x-4"><Button onClick={handleBackup}>Tải về file sao lưu (.json)</Button><Button variant="secondary" onClick={handleRestoreClick}>Khôi phục từ file</Button><input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleFileChange} /></div></div>
            );
        };
        return (
            <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30 space-y-12">
                <div className="flex justify-between items-center border-b border-gray-600 pb-4"><h2 className="text-3xl font-bold text-gray-100">Bảng điều khiển</h2><Button variant="danger" onClick={logout}>Đăng xuất</Button></div>
                <AvatarEditor avatarUrl={avatarUrl} onSave={updateAvatarUrl} />
                <BioEditor bio={bio} onSave={updateBio} />
                <DissertationEditor dissertation={dissertation} onSave={updateDissertation} />
                <ContactEditor contactInfo={contactInfo} onSave={updateContactInfo} />
                <ActivityManager activities={professionalActivities} setActivities={setProfessionalActivities} />
                <PaperManager papers={papers} setPapers={setPapers} />
                <BackupRestore bio={bio} dissertation={dissertation} papers={papers} avatarUrl={avatarUrl} contactInfo={contactInfo} professionalActivities={professionalActivities} restoreData={restoreData} />
            </div>
        );
    };

    return <div>{props.isLoggedIn ? <AdminDashboard {...props} /> : <LoginForm onLogin={props.login} />}</div>;
};


// --- FROM App.tsx ---
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const portfolioData = usePortfolioData();

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage bio={portfolioData.bio} avatarUrl={portfolioData.avatarUrl} professionalActivities={portfolioData.professionalActivities} />;
            case 'dissertation': return <DissertationPage dissertation={portfolioData.dissertation} />;
            case 'research': return <ResearchPage papers={portfolioData.papers} />;
            case 'contact': return <ContactPage contactInfo={portfolioData.contactInfo} />;
            case 'admin': return <AdminPage {...portfolioData} />;
            default: return <HomePage bio={portfolioData.bio} avatarUrl={portfolioData.avatarUrl} professionalActivities={portfolioData.professionalActivities} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black/20 backdrop-blur-sm text-gray-200">
            <Header setCurrentPage={setCurrentPage} isLoggedIn={portfolioData.isLoggedIn} />
            <main className="flex-grow container mx-auto px-4 py-8">{renderPage()}</main>
            <Footer />
        </div>
    );
};

const AppContainer: React.FC = () => (
    <DataProvider>
        <App />
    </DataProvider>
);


// --- RENDER LOGIC ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Không tìm thấy phần tử root để gắn ứng dụng");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
