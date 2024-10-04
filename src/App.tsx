import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from 'routes/routes';
import './App.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.compact.css';
import LoginProvider from 'components/pages/Login/LoginProvider';
import { DashboardLayout } from 'components';

export default function App() {
    return (
        <BrowserRouter>
            <LoginProvider>
                <DashboardLayout>
                    <AppRoutes />
                </DashboardLayout>
            </LoginProvider>
        </BrowserRouter>
    );
}
