
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Paper, Dissertation } from '../types';

// --- Initial Data ---
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
    restoreData: (data: { bio: string; dissertation: Dissertation; papers: Paper[] }) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider Component ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bio, setBio] = useState<string>(INITIAL_BIO);
    const [dissertation, setDissertation] = useState<Dissertation>(INITIAL_DISSERTATION);
    const [papers, setPapers] = useState<Paper[]>(INITIAL_PAPERS);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    
    const restoreData = useCallback((data: { bio: string; dissertation: Dissertation; papers: Paper[] }) => {
        if (data.bio) setBio(data.bio);
        if (data.dissertation) setDissertation(data.dissertation);
        if (data.papers) setPapers(data.papers);
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
        restoreData
    };

    // FIX: Replaced JSX with React.createElement to resolve parsing errors. The file has a .ts extension but contains JSX, which causes compilation errors. Using React.createElement is the equivalent and works in a .ts file.
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
