import React from 'react';
import styles from './LoginLayout.module.scss';
import { Spin } from 'antd';
import classnames from 'clsx';

export interface LoginLayoutProps {
    component: React.ReactNode;
    isLoading?: boolean;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ component, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <Spin />
            </div>
        );
    }

    return (
        <div className={classnames(styles.LoginPage, 'w-screen h-screen w-screen flex items-center overflow-hidden')}>
            <img src="/images/events/creative-registration.png" className="w-2/5" />
            {/* <div className="flex flex-col items-start text-left w-2/5 gap-4 p-24">
                <img src="/images/branding/logo-2.png" className="w-32" />
                <p className="text-lg">
                    Get access to our{' '}
                    <span className="font-semibold">growing list of trustworthy creative event suppliers.</span>
                </p>
                <img src="/images/events/login-graphic.png " className="w-full mt-8" />
            </div> */}
            <div className="flex-1 flex flex-col items-center text-center bg-white h-screen">
                <div className="flex-1"></div>
                <div className="flex flex-col items-center text-center">
                    <img src="/images/branding/logo.png" className="w-56" />
                    <h1 className="font-semibold">Welcome back!</h1>
                    <p className="text-md">Log-in to your account with your email to view or plan your events.</p>

                    {component}
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    );
};

export default LoginLayout;
