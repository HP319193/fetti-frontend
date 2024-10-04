import React from 'react';
import classnames from 'clsx';
import FooterContent from '../FooterContent';

const Footer = (props: any) => {
    return (
        <div
            className={classnames('w-full z-50 px-8 bg-white py-4 border-top border-solid border-slate-100')}
            style={{ zIndex: 1000 }}
        >
            <FooterContent />
        </div>
    );
};

export default Footer;
