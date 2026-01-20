import React from 'react';

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

const ContactPage: React.FC = () => {
    return (
        <div className="bg-gray-900/70 p-6 md:p-10 rounded-xl shadow-2xl backdrop-blur-md border border-gray-500/30">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Thông tin liên hệ</h1>
                <p className="text-lg text-gray-400 mt-2">Thông tin chính thức để liên hệ công tác và trao đổi học thuật.</p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <ContactInfoItem icon="🏢" title="Nơi công tác">
                        <p className="font-bold">Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa</p>
                        <p>Số 01, Đại lộ Lê Lợi, Phường Lam Sơn, TP. Thanh Hóa, Tỉnh Thanh Hóa</p>
                    </ContactInfoItem>
                    <ContactInfoItem icon="📧" title="Email học thuật">
                        <a href="mailto:son.hn@thanhhoa.gov.vn" className="text-gray-300 hover:underline">
                            son.hn@thanhhoa.gov.vn
                        </a>
                    </ContactInfoItem>
                     <ContactInfoItem icon="📞" title="Điện thoại">
                        <p>(+84) 123 456 789 (Vui lòng chỉ liên hệ trong giờ hành chính)</p>
                    </ContactInfoItem>
                </div>
                
                <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-[300px] overflow-hidden">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.579626359424!2d105.77421881538309!3d19.80550478665091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f81dd1aaaaab%3A0x4858cb339c4a851d!2zVMOyYSBuaMOgIEjhu5lpIMSR4buTbmcgTmjDom4gZMJuIFThu4luaCBUaGFuaCBIRCVDMyVCM2E!5e0!3m2!1svi!2s!4v1689234567890!5m2!1svi!2s" 
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