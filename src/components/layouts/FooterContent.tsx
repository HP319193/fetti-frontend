import { Divider } from 'antd';
import React from 'react';
import { PopupButton } from '@typeform/embed-react';
import { NotificationOutlined } from '@ant-design/icons';

const FooterContent = (props: any) => {
    return (
        <div className="flex flex-row">
            <p className="text-slate-400 mr-2 m-0 flex-1">
                <img src="/images/branding/logo-2.png" className="h-4 opacity-60 hover:opacity-100" />
                &nbsp;&copy; 2024
                <span className="font-bold text-gray-400 font-light mr-2 ml-2">&middot;</span>
                <span className="text-gray-400 font-light mr-2 cursor-arrow">fetti website</span>
                <span className="font-bold text-gray-400 font-light mr-2">&middot;</span>
                <span className="text-gray-400 font-light mr-2 cursor-arrow">privacy policy</span>
                <span className="font-bold text-gray-400 font-light mr-2">&middot;</span>
                <span className="text-gray-400 font-light mr-2 cursor-arrow">terms & conditions</span>
                <span className="font-bold text-gray-400 font-light mr-2">&middot;</span>
                <span className="text-gray-400 font-light mr-2 cursor-arrow">vendor manual</span>
                <span className="font-bold text-gray-400 font-light mr-2">&middot;</span>
                <span className="text-gray-400 font-light mr-2 cursor-arrow">report an issue</span>
            </p>

            <div className="flex flex-row items-center gap-8">
                <PopupButton id="mzQu4KyJ" className="give-feedback-btn">
                    <div className="flex items-center gap-2">
                        <NotificationOutlined />
                        <span className="text-xs">share your feedback!</span>
                    </div>
                </PopupButton>
                <img src="/images/footer-socials.png" style={{ width: '100px' }} />
            </div>
        </div>
    );
};

export default FooterContent;
