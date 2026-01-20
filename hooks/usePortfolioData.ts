import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Paper, Dissertation, ContactInfo, ProfessionalActivity } from '../types';

// --- Storage Key ---
const STORAGE_KEY = 'portfolioData_tsHaNgocSon';

// --- Initial Data (Defaults for the very first visit) ---
const INITIAL_BIO = "TS. Hà Ngọc Sơn là một nhà lãnh đạo và chuyên gia uyên bác trong lĩnh vực Quản lý Kinh tế. Với học vị Tiến sĩ, ông hiện đang giữ chức vụ Phó Chánh Văn phòng Đoàn Đại biểu Quốc hội và Hội đồng Nhân dân tỉnh Thanh Hóa. Ông có niềm đam mê sâu sắc với việc phát triển kinh tế biển bền vững, đặc biệt là tại quê hương Thanh Hóa, nơi ông đã và đang cống hiến trí tuệ và tâm huyết của mình.";

const INITIAL_DISSERTATION: Dissertation = {
  title: "Phát triển kinh tế biển xanh tại tỉnh Thanh Hóa",
  summary: "Luận án đi sâu phân tích toàn diện thực trạng, tiềm năng và thách thức trong việc phát triển kinh tế biển tại tỉnh Thanh Hóa theo hướng bền vững. Dựa trên nền tảng lý luận về kinh tế xanh và kinh nghiệm quốc tế, luận án đề xuất một hệ thống các giải pháp chiến lược đồng bộ, từ chính sách vĩ mô đến các mô hình kinh doanh cụ thể, nhằm khai thác hiệu quả tiềm năng biển, bảo vệ môi trường sinh thái và nâng cao đời sống người dân, đưa Thanh Hóa trở thành một trung tâm kinh tế biển mạnh của cả nước.",
  fileUrl: "/luan_an_ts_ha_ngoc_son.pdf"
};

const INITIAL_PAPERS: Paper[] = [
  {
    id: '1',
    title: "Một số giải pháp nhằm phát triển kinh tế biển theo hướng xanh tại tỉnh Thanh Hóa",
    summary: "Bài báo tập trung vào việc đề xuất các giải pháp thực tiễn, có tính khả thi cao để chuyển đổi mô hình kinh tế biển Thanh Hóa. Các giải pháp bao gồm việc hoàn thiện cơ chế chính sách, thu hút đầu tư xanh, phát triển nguồn nhân lực chất lượng cao và ứng dụng công nghệ sạch trong các ngành kinh tế biển chủ lực như du lịch, thủy sản và logistics.",
    fileUrl: "/bai_bao_1.pdf"
  },
  {
    id: '2',
    title: "Mô hình nghiên cứu các nhân tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa",
    summary: "Nghiên cứu xây dựng một mô hình lý thuyết toàn diện, xác định các nhân tố cốt lõi tác động đến sự phát triển kinh tế biển xanh tại Thanh Hóa, bao gồm: thể chế, nguồn vốn, công nghệ, nhân lực và nhận thức. Bài báo là cơ sở khoa học cho các nghiên cứu định lượng sâu hơn.",
    fileUrl: "/bai_bao_2.pdf"
  },
  {
    id: '3',
    title: "Các nhân tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa",
    summary: "Bài viết này là phần tiếp theo, trình bày kết quả phân tích định lượng dựa trên mô hình đã đề xuất. Kết quả chỉ ra rằng nguồn nhân lực và thể chế chính sách là hai yếu tố có tác động mạnh mẽ nhất, từ đó đưa ra các hàm ý quản trị quan trọng cho tỉnh.",
    fileUrl: "/bai_bao_3.pdf"
  },
  {
    id: '4',
    title: "Ứng dụng mô hình hồi quy trong phân tích các yếu tố ảnh hưởng đến phát triển kinh tế biển xanh tại tỉnh Thanh Hóa",
    summary: "Công trình sử dụng mô hình hồi quy tuyến tính để phân tích dữ liệu khảo sát từ các doanh nghiệp, lượng hóa mức độ ảnh hưởng của từng yếu tố đến sự phát triển kinh tế biển xanh. Kết quả khẳng định vai trò then chốt của nguồn nhân lực và hạ tầng, cung cấp bằng chứng thực nghiệm giá trị.",
    fileUrl: "/bai_bao_4.pdf"
  },
];

const INITIAL_AVATAR_URL = "https://picsum.photos/300/300?grayscale";

const INITIAL_CONTACT_INFO: ContactInfo = {
    workplace: "Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa",
    address: "Số 35, Đại lộ Lê Lợi, Phường Hạch Thành, Tỉnh Thanh Hóa",
    email: "sonhn@thanhhoa.gov.vn",
    phone: "(+84) 904818886 (Vui lòng chỉ liên hệ trong giờ hành chính)",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.579626359424!2d105.77421881538309!3d19.80550478665091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f81dd1aaaaab%3A0x4858cb339c4a851d!2zVMOyYSBuaMOgIEjhu5lpIMSR4buTbmcgTmjDom4gZMJuIFThu4luaCBUaGFuaCBIRCVDMyVCM2E!5e0!3m2!1svi!2s!4v1689234567890!5m2!1svi!2s"
};

const INITIAL_ACTIVITIES: ProfessionalActivity[] = [
    {
        id: '1',
        title: "Tư vấn chính sách",
        description: "Tham gia tư vấn cho các cơ quan địa phương về chiến lược phát triển kinh tế - xã hội."
    },
    {
        id: '2',
        title: "Hội thảo khoa học",
        description: "Trình bày báo cáo tại các hội thảo khoa học trong nước và quốc tế."
    },
    {
        id: '3',
        title: "Giảng dạy & Hướng dẫn",
        description: "Thỉnh giảng tại các trường đại học và hướng dẫn sinh viên, học viên cao học."
    }
];


// --- Context Definition ---
interface DataContextType {
    bio: string;
    dissertation: Dissertation;
    papers: Paper[];
    isLoggedIn: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    updateBio: (newBio: string) => void;
    updateDissertation: (newDissertation: Dissertation) => void;
    setPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
    avatarUrl: string;
    contactInfo: ContactInfo;
    professionalActivities: ProfessionalActivity[];
    updateAvatarUrl: (newUrl: string) => void;
    updateContactInfo: (newInfo: ContactInfo) => void;
    setProfessionalActivities: React.Dispatch<React.SetStateAction<ProfessionalActivity[]>>;
    restoreData: (data: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider Component ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Helper function to load initial state from localStorage or use defaults
    const loadState = <T,>(key: string, defaultValue: T): T => {
        try {
            const savedItem = localStorage.getItem(STORAGE_KEY);
            if (savedItem) {
                const parsedData = JSON.parse(savedItem);
                return parsedData[key] ?? defaultValue;
            }
        } catch (error) {
            console.error(`Error reading ${key} from localStorage`, error);
        }
        return defaultValue;
    };

    const [bio, setBio] = useState<string>(() => loadState('bio', INITIAL_BIO));
    const [dissertation, setDissertation] = useState<Dissertation>(() => loadState('dissertation', INITIAL_DISSERTATION));
    const [papers, setPapers] = useState<Paper[]>(() => loadState('papers', INITIAL_PAPERS));
    const [avatarUrl, setAvatarUrl] = useState<string>(() => loadState('avatarUrl', INITIAL_AVATAR_URL));
    const [contactInfo, setContactInfo] = useState<ContactInfo>(() => loadState('contactInfo', INITIAL_CONTACT_INFO));
    const [professionalActivities, setProfessionalActivities] = useState<ProfessionalActivity[]>(() => loadState('professionalActivities', INITIAL_ACTIVITIES));
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Effect to save all data to localStorage whenever any piece of it changes
    useEffect(() => {
        try {
            const dataToSave = {
                bio,
                dissertation,
                papers,
                avatarUrl,
                contactInfo,
                professionalActivities,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        } catch (error) {
            console.error("Error saving data to localStorage", error);
        }
    }, [bio, dissertation, papers, avatarUrl, contactInfo, professionalActivities]);


    const login = useCallback((password: string) => {
        if (password === 'admin') {
            setIsLoggedIn(true);
            return true;
        }
        return false;
    }, []);
    
    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

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


    const value = {
        bio,
        dissertation,
        papers,
        isLoggedIn,
        login,
        logout,
        updateBio,
        updateDissertation,
        setPapers,
        avatarUrl,
        contactInfo,
        professionalActivities,
        updateAvatarUrl,
        updateContactInfo,
        setProfessionalActivities,
        restoreData
    };
    
    return React.createElement(DataContext.Provider, { value }, children);
};

// --- Custom Hook ---
export const usePortfolioData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('usePortfolioData must be used within a DataProvider');
    }
    return context;
};
