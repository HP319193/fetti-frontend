import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { message } from 'antd';
import { BEARER } from '../../../constants';
import { getToken, removeToken, switchToEventPlanner } from '../../../helpers';
import useMount from 'hooks/useMount';
import { useNavigate } from 'react-router-dom';

const LoginProvider: FunctionComponent<any> = props => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

    const authToken = getToken();

    const fetchLoggedInUser = useCallback(
        async (token: string) => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiServerUrl}/api/users/me?populate=services`, {
                    headers: { Authorization: `${BEARER} ${token}` },
                });
                const data = await response.json();
                console.log('user data', data);

                if (!data?.downpayment) {
                    data.downpayment = '20';
                }
                if (!data.cancellation) {
                    data.cancellation = 'no_cancellation_a_day_prior';
                }
                if (!data.cancellation_fee) {
                    data.cancellation_fee = '50';
                }

                setUserData(data);

                const role = localStorage.getItem('role') || 'event-planner';
                const path = window.location.pathname;

                if (role == 'event-planner' && (!data?.first_name || !data?.last_name || !data?.phone_number)) {
                    if (path !== '/register') navigate('/register');
                } else if (
                    role == 'creative-worker' &&
                    (!data?.first_name || !data?.last_name || !data?.phone_number || !data?.business_name)
                ) {
                    if (path !== '/register') navigate('/register');
                } else if (role == 'creative-worker' && !data?.services?.length) {
                    if (path !== '/creative/services') navigate('/creative/services');
                }
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                message.error('Error While Getting Logged In User Details');
                setIsLoading(false);
                removeToken();
                switchToEventPlanner();
            }
        },
        [setUserData, navigate, apiServerUrl],
    );

    const handleUser = (user?: any) => {
        setUserData(user);
    };

    const handleRefresh = () => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    };

    useMount(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        } else {
            setIsLoading(false);
        }
    });

    return (
        <AuthContext.Provider
            value={{
                user: userData,
                setUser: handleUser,
                fetchUser: handleRefresh,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default LoginProvider;
