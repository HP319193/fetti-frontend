import React, { useCallback, useContext, useEffect, useState } from 'react';
import LoginErrorPage from './LoginErrorPage/LoginErrorPage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { login } from 'services/message.service';
import useMount from 'hooks/useMount';
import { setToken } from 'helpers';
import { AuthContext } from 'context/AuthContext';
import { DashboardLayout } from 'components/layouts';
import { Form, Spin, message } from 'antd';
import RegistrationPage from './RegistrationPage';

const CallbackPage = () => {
    const navigate = useNavigate();
    const { setUser } = useContext<any>(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tokenFetched, setTokenFetched] = useState(false);
    const [error, setError] = useState(false);
    const loginToken = searchParams.get('loginToken') || '';
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { request, loading: loginLoading } = useApi({
        api: login,
    });

    useMount(() => {
        localStorage.setItem('role', 'creative-worker');
        const loggingIn = localStorage.getItem('logging-in');
        console.log('logging in');
        console.log(loggingIn);
        if (loginToken && !tokenFetched && !loggingIn) {
            localStorage.setItem('logging-in', 'y');
            setTokenFetched(true);
            fetchToken();
        }
    });

    const fetchToken = useCallback(async () => {
        try {
            const response = await request({ loginToken });
            const role = localStorage.getItem('role') || 'event-planner';

            console.log('response', response);
            if (response.data?.jwt) {
                setToken(response.data?.jwt);
                setUser(response.data?.user);
                setTokenFetched(true);
                localStorage.removeItem('logging-in');

                window.location.href = '/';

                // if (role == 'event-planner') {
                //     setLoading(true);
                //     if (
                //         !response.data?.user?.first_name ||
                //         !response.data?.user?.last_name ||
                //         !response.data?.user?.phone_number
                //     ) {
                //         navigate('/register');
                //         return;
                //     }
                // } else if (role == 'creative-worker') {
                //     setLoading(true);
                //     if (
                //         !response.data?.user?.first_name ||
                //         !response.data?.user?.last_name ||
                //         !response.data?.user?.phone_number ||
                //         !response.data?.user?.business_name
                //     ) {
                //         navigate('/register');
                //         return;
                //     } else if (!response.data?.user?.services?.length) {
                //         navigate('/register/services');
                //         return;
                //     }
                // }

                // const navigateBack = localStorage.getItem('navigate-back') || '/';
                // navigate(navigateBack);
            }
            console.log('logic done');
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }, [loginToken, request, setTokenFetched, setUser]);

    if (!loginToken || error) {
        return <LoginErrorPage />;
    }

    return (
        <div className="page-layout w-full flex h-full items-center text-center flex-col">
            {!error && (
                <div className="h-96 block flex items-center justify-center">
                    <img src="/images/loading-v2.gif" alt="loading" style={{ width: '220px', marginTop: '120px' }} />
                </div>
            )}

            {error && (
                <div className="p-4">
                    <p className="font-semibold">Ooops! Something went wrong with your request. Please try again.</p>
                    <a href="/">Go Back</a>
                </div>
            )}
        </div>
    );
};

export default CallbackPage;
