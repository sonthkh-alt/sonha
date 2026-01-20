import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DissertationPage from './pages/DissertationPage';
import ResearchPage from './pages/ResearchPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import { usePortfolioData, DataProvider } from './hooks/usePortfolioData';
import { Page } from './types';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const { bio, dissertation, papers, isLoggedIn, login, logout, updateBio, updateDissertation, setPapers, restoreData } = usePortfolioData();

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage bio={bio} />;
            case 'dissertation':
                return <DissertationPage dissertation={dissertation} />;
            case 'research':
                return <ResearchPage papers={papers} />;
            case 'contact':
                return <ContactPage />;
            case 'admin':
                return <AdminPage 
                            isLoggedIn={isLoggedIn} 
                            login={login} 
                            logout={logout}
                            bio={bio}
                            updateBio={updateBio}
                            dissertation={dissertation}
                            updateDissertation={updateDissertation}
                            papers={papers}
                            setPapers={setPapers}
                            restoreData={restoreData}
                        />;
            default:
                return <HomePage bio={bio} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black/20 backdrop-blur-sm text-gray-200">
            <Header setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} />
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <DataProvider>
            <AppContent />
        </DataProvider>
    );
}

export default App;