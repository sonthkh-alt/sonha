import React, { useState, useRef, useCallback } from 'react';
import { Paper, Dissertation } from '../types';

// --- Reusable Components ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'bg-gray-700 text-white hover:bg-gray-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<InputProps> = (props) => (
  <input
    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    {...props}
  />
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea
    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    rows={5}
    {...props}
  />
);

// --- Login Form ---
interface LoginFormProps {
    onLogin: (password: string) => boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!onLogin(password)) {
            setError('Mật khẩu không đúng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gray-900/70 p-8 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Đăng nhập Quản trị</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="username">Tài khoản</label>
                    <Input id="username" type="text" value="admin" readOnly className="bg-gray-700" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2" htmlFor="password">Mật khẩu</label>
                    <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu là 'admin'"
                        required 
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <Button type="submit" className="w-full">Đăng nhập</Button>
            </form>
        </div>
    );
};

// --- Admin Dashboard Components ---

const BioEditor: React.FC<{ bio: string; onSave: (newBio: string) => void; }> = ({ bio, onSave }) => {
    const [currentBio, setCurrentBio] = useState(bio);
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-200">Tiểu sử</h3>
            <Textarea value={currentBio} onChange={(e) => setCurrentBio(e.target.value)} rows={8} />
            <Button onClick={() => onSave(currentBio)}>Lưu tiểu sử</Button>
        </div>
    );
};

const PaperManager: React.FC<{ papers: Paper[]; setPapers: React.Dispatch<React.SetStateAction<Paper[]>>; }> = ({ papers, setPapers }) => {
    const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSave = (paperToSave: Paper) => {
        if (isCreating) {
            setPapers(prev => [...prev, { ...paperToSave, id: new Date().toISOString() }]);
        } else {
            setPapers(prev => prev.map(p => p.id === paperToSave.id ? paperToSave : p));
        }
        setEditingPaper(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài báo này không?')) {
            setPapers(prev => prev.filter(p => p.id !== id));
        }
    };
    
    const handleAddNew = () => {
        setIsCreating(true);
        setEditingPaper({ id: '', title: '', summary: '', fileUrl: '' });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-200">Quản lý Bài báo Khoa học</h3>
                <Button onClick={handleAddNew}>Thêm bài báo mới</Button>
            </div>
            <div className="space-y-4">
                {papers.map(paper => (
                    <div key={paper.id} className="bg-gray-800 p-4 rounded-md flex justify-between items-start">
                        <div>
                           <p className="font-bold text-gray-200">{paper.title}</p>
                           <p className="text-sm text-gray-400 truncate max-w-md">{paper.summary}</p>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 ml-4">
                            <Button variant="secondary" onClick={() => { setIsCreating(false); setEditingPaper(paper); }}>Sửa</Button>
                            <Button variant="danger" onClick={() => handleDelete(paper.id)}>Xóa</Button>
                        </div>
                    </div>
                ))}
            </div>
            {editingPaper && <PaperForm paper={editingPaper} onSave={handleSave} onCancel={() => setEditingPaper(null)} />}
        </div>
    );
};

const PaperForm: React.FC<{ paper: Paper; onSave: (paper: Paper) => void; onCancel: () => void; }> = ({ paper, onSave, onCancel }) => {
    const [formData, setFormData] = useState(paper);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
           // In a real app, this would upload to a server and return a URL.
           // Here, we just use the file name as a placeholder.
           setFormData(prev => ({ ...prev, fileUrl: `/uploads/${e.target.files![0].name}` }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
                 <h2 className="text-2xl font-bold mb-4 text-gray-100">{paper.id ? 'Sửa bài báo' : 'Thêm bài báo mới'}</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Tiêu đề</label>
                        <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-gray-300">Tóm tắt</label>
                        <Textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} required />
                    </div>
                     <div>
                        <label className="block text-gray-300">Tải file PDF</label>
                        <Input type="file" accept=".pdf" onChange={handleFileChange} />
                        <p className="text-sm text-gray-400 mt-1">File hiện tại: {formData.fileUrl}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
                        <Button type="submit">Lưu</Button>
                    </div>
                 </form>
            </div>
        </div>
    )
}

const BackupRestore: React.FC<{
    bio: string;
    dissertation: Dissertation;
    papers: Paper[];
    restoreData: (data: any) => void;
}> = ({ bio, dissertation, papers, restoreData }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBackup = useCallback(() => {
        const data = { bio, dissertation, papers };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `backup_ts_ha_ngoc_son_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }, [bio, dissertation, papers]);

    const handleRestoreClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const data = JSON.parse(text);
                        restoreData(data);
                        alert('Khôi phục dữ liệu thành công!');
                    }
                } catch (error) {
                    alert('Lỗi: File sao lưu không hợp lệ.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-200">Sao lưu & Khôi phục</h3>
            <p className="text-gray-400">Lưu trữ toàn bộ dữ liệu website hoặc khôi phục từ một file sao lưu.</p>
            <div className="flex space-x-4">
                <Button onClick={handleBackup}>Tải về file sao lưu (.json)</Button>
                <Button variant="secondary" onClick={handleRestoreClick}>Khôi phục từ file</Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".json"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

const AdminDashboard: React.FC<AdminPageProps> = ({ logout, bio, updateBio, dissertation, updateDissertation, papers, setPapers, restoreData }) => (
    <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30 space-y-12">
        <div className="flex justify-between items-center border-b border-gray-600 pb-4">
            <h2 className="text-3xl font-bold text-gray-100">Bảng điều khiển</h2>
            <Button variant="danger" onClick={logout}>Đăng xuất</Button>
        </div>
        
        <BioEditor bio={bio} onSave={updateBio} />
        <PaperManager papers={papers} setPapers={setPapers} />
        <BackupRestore bio={bio} dissertation={dissertation} papers={papers} restoreData={restoreData} />
    </div>
);


// --- Main Page Component ---
interface AdminPageProps {
    isLoggedIn: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    bio: string;
    updateBio: (newBio: string) => void;
    dissertation: Dissertation;
    updateDissertation: (newDissertation: Dissertation) => void;
    papers: Paper[];
    setPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
    restoreData: (data: any) => void;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    return (
        <div>
            {props.isLoggedIn ? <AdminDashboard {...props} /> : <LoginForm onLogin={props.login} />}
        </div>
    );
};

export default AdminPage;