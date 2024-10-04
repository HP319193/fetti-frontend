import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Input, Select, Skeleton, message } from 'antd';
import classnames from 'clsx';
import { Text, TextArea } from 'components/basic';
import { useNavigate } from 'react-router-dom';
import VendorLayout from './Vendor/VendorLayout';
import useMount from 'hooks/useMount';
import { DashboardLayout } from 'components/layouts';
import useApi from 'hooks/useApi';
import { getServices, updateUser } from 'services/message.service';
import { AuthContext } from 'context/AuthContext';
import { register } from 'serviceWorker';
import { Option } from 'antd/lib/mentions';
import Meta from 'antd/lib/card/Meta';
import ServiceCard from './ServiceCard';

const RegistrationServicesPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user, setUser } = useContext<any>(AuthContext);

    const [data, setData] = useState([]);
    const [selectedServices, setSelectedServices] = useState<any>([]);

    const { request, result, loading } = useApi({
        api: getServices,
    });

    const role = localStorage.getItem('role') || 'event-planner';

    const {
        request: updateUserRequest,
        loading: updateUserLoading,
        result: updateUserResult,
    } = useApi({
        api: updateUser,
    });

    const fetchServices = useCallback(
        (requestState: {}) => {
            request(requestState)
                .then(result => {
                    let records = result?.data?.data?.map((c: any) => {
                        return {
                            ...c.attributes,
                            key: c.id,
                            id: c.id,
                        };
                    });
                    setData(records);
                })
                .catch(error => {
                    message.error(error.message);
                });
        },
        [request],
    );

    useMount(() => {
        fetchServices({});

        if (isAccountReady()) {
            navigate('/registered');
        }
    });

    useEffect(() => {
        if (data && user && user.services) {
            setSelectedServices(user.services.map((s: any) => s.id));
        }
    }, [data, user]);

    const isAccountReady = () => {
        if (role == 'event-planner') {
            return user?.first_name && user?.last_name && user?.phone_number;
        } else if (role == 'creative-worker') {
            return (
                user?.first_name &&
                user?.last_name &&
                user?.phone_number &&
                user?.business_name &&
                user?.services?.length
            );
        }
    };

    const handleNext = useCallback(async () => {
        if (selectedServices.length === 0) {
            message.error('Please select at least one service.');
        } else {
            const res = await updateUserRequest({
                id: user.id,
                body: {
                    services: {
                        set: selectedServices,
                    },
                },
            });

            if (res.error) {
                console.log(res.error);
                message.error(res.error.message);
                return;
            }

            const data = res.data;
            navigate('/register/docs');
            return;
        }
    }, [selectedServices, navigate, updateUserRequest, user]);

    const handleServiceClick = useCallback(
        (service: any) => {
            if (selectedServices.includes(service.id)) {
                setSelectedServices(selectedServices.filter((s: any) => s !== service.id));
            } else {
                setSelectedServices([...selectedServices, service.id]);
            }
        },
        [selectedServices],
    );

    return (
        <div className="flex flex-col w-full gap-2 px-40 py-8 justify-center">
            <div>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="font-bold text-2xl m-0" style={{ letterSpacing: '-1px' }}>
                        dearest creative, we're a fan of&nbsp;
                        <span className="font-semibold text-fetti">what you do.</span>
                    </h1>
                    <p className="text-md">Which event service/s do you offer?</p>
                </div>
                <div className="grid grid-cols-6 gap-4 mb-8">
                    {loading ? (
                        <>
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                        </>
                    ) : (
                        data?.map((service: any) => {
                            return (
                                <div
                                    onClick={() => handleServiceClick(service)}
                                    className={classnames(
                                        'cursor-pointer transition-all shadow-md hover:shadow-xl hover:border-gray-300 p-1',
                                    )}
                                    style={{
                                        background: selectedServices.includes(service.id) ? '#e8107c' : 'white',
                                        borderRadius: '18px',
                                    }}
                                >
                                    <ServiceCard
                                        photoUrl={service.thumbnail?.data?.attributes?.formats?.large?.url}
                                        name={service.name}
                                        color={service.color}
                                        noShadow
                                        height="240px"
                                        fontSize="18px"
                                    />
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="flex flex-row-reverse gap-2 w-full">
                    <Button
                        type="primary"
                        onClick={handleNext}
                        disabled={selectedServices.length === 0 || updateUserLoading || loading}
                        loading={updateUserLoading || loading}
                    >
                        continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationServicesPage;
