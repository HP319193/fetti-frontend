import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { switchToEventPlanner } from 'helpers';

export const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        switchToEventPlanner();
    };

    return (
        <button
            className="bg-inherit border-transparent w-full text-left cursor-pointer font-semibold"
            onClick={handleLogout}
        >
            log out
        </button>
    );
};

export default LogoutButton;
