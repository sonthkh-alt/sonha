import React from 'react';
import { ContactInfo } from '../types';

const ContactInfoItem: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
            <div className="text-gray-300">{children}</div>
        </div>
    </div>
);

interface ContactPageProps {
    contactInfo: ContactInfo;
}

const ContactPage: React.FC<ContactPageProps> = ({ contactInfo }) => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Thông tin liên hệ</h1>
                <p className="text-lg text-gray-400 mt-2">Thông tin chính thức để liên hệ công tác và trao đổi học thuật.</p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <ContactInfoItem icon="🏢" title="Nơi công tác">
                        <p className="font-bold">{contactInfo.workplace}</p>
                        <p>{contactInfo.address}</p>
                    </ContactInfoItem>
                    <ContactInfoItem icon="📧" title="Email học thuật">
                        <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:underline">
                            {contactInfo.email}
                        </a>
                    </ContactInfoItem>
                     <ContactInfoItem icon="📞" title="Điện thoại">
                        <p>{contactInfo.phone}</p>
                    </ContactInfoItem>
                </div>
                
                <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-[300px] overflow-hidden">
                     <iframe 
                        src={contactInfo.mapUrl} 
                        width="100%" 
                        height="100%" 
                        className="filter grayscale(1)"
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;