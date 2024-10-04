import LoginLayout from 'components/layouts/LoginLayout/LoginLayout';
import React from 'react';
import styles from './LoginErrorPage.module.scss';
import classnames from 'clsx';
import { useNavigate } from 'react-router-dom';
import Text from 'components/basic/Typography/Text';
import { Button } from 'antd';

const LoginErrorPage: React.FC = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-start gap-8 py-40">
            <div>
                <Text size="text-md lg:text-lg 2xl:text-xl" fontWeight="font-bold" className="leading-none text-center">
                    Oops! Looks like something went wrong.
                </Text>
            </div>
            <div>
                <Button className={classnames(styles.RetryButton)} onClick={handleLogin}>
                    Retry Logging in
                </Button>
            </div>
        </div>
    );
};

export default LoginErrorPage;
