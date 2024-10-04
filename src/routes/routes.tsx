import React, { Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import useMount from 'hooks/useMount';
import { setAuthInterceptor } from 'interceptors/request';
import { getToken } from 'helpers';
import CreativesRegistrationPage from 'components/pages/CreativesRegistration/CreativesRegistrationPage';
import ComingSoonPage from 'components/pages/ComingSoonPage';
import DashboardPage from 'components/pages/DashboardPage';
import ProductPage from 'components/pages/ProductPage';
import CallbackPage from 'components/pages/CallbackPage';
import RegistrationPage from 'components/pages/RegistrationPage';
import { AuthContext } from 'context/AuthContext';
import RegisteredPage from 'components/pages/RegisteredPage';
import CreativePage from 'components/pages/CreativePage';
import CreativeProfilePage from 'components/pages/CreativeProfilePage';
import CreativeServicesPage from 'components/pages/CreativeServicesPage';
import RegistrationServicesPage from 'components/pages/RegistrationServicesPage';
import RegistrationDocsPage from 'components/pages/RegistrationDocsPage';
import CreativeViewServicePage from 'components/pages/CreativeViewServicePage';
import CreativeProductPage from 'components/pages/CreativeProductPage';

export const AppRoutes = () => {
    const { user } = useContext<any>(AuthContext);

    useMount(() => {
        const accessToken = getToken();
        if (accessToken) {
            setAuthInterceptor(accessToken);
        }
    });

    return (
        <Suspense fallback={<Spin />}>
            <Routes>
                <Route key="/" path="/" element={<DashboardPage />} />
                {/* <Route
                    key="/creatives-registration"
                    path="/creatives-registration"
                    element={<CreativesRegistrationPage />}
                /> */}
                <Route key="/products/:id" path="/products/:id" element={<ProductPage />} />
                <Route key="/register" path="/register" element={<RegistrationPage />} />
                <Route key="/register/services" path="/register/services" element={<RegistrationServicesPage />} />
                <Route key="/register/docs" path="/register/docs" element={<RegistrationDocsPage />} />
                <Route key="/registered" path="/registered" element={<RegisteredPage />} />
                {/* <Route key="/vendor/calendar" path="/vendor/calendar" element={<CalendarPage />} /> */}
                <Route key="/callback" path="/callback" element={<CallbackPage />} />

                <Route key="/creative/profile" path="/creative/profile" element={<CreativeProfilePage />} />
                <Route key="/creative/services" path="/creative/services" element={<CreativeServicesPage />} />
                <Route
                    key="/creative/services/:serviceId"
                    path="/creative/services/:serviceId"
                    element={<CreativeViewServicePage />}
                />
                <Route
                    key="/creative/services/:serviceId/product-add"
                    path="/creative/services/:serviceId/product-add"
                    element={<CreativeProductPage />}
                />
                <Route
                    key="/creative/services/:serviceId/products/:productId"
                    path="/creative/services/:serviceId/products/:productId"
                    element={<CreativeProductPage />}
                />
                <Route path="*" element={<ComingSoonPage />} />
            </Routes>
        </Suspense>
    );
};
