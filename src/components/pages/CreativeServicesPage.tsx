import React, { FunctionComponent, useContext, useEffect } from 'react';
import useMount from 'hooks/useMount';
import { DashboardLayout } from 'components/layouts';
import { CalendarOutlined } from '@ant-design/icons';
import classnames from 'clsx';
import { Avatar, Button, Divider, Skeleton } from 'antd';
import CreativePage from './CreativePage';
import { AuthContext } from 'context/AuthContext';
import useApi from 'hooks/useApi';
import { getServices } from 'services/message.service';
import { useNavigate } from 'react-router-dom';
import CreativeServiceAddModal from './CreativeServiceAddModal';
import useModal from 'antd/lib/modal/useModal';
import { FormOutlined } from '@ant-design/icons';
import ServiceCard from './ServiceCard';

const CreativeServicesPage = (props: any) => {
    const navigate = useNavigate();
    const { user, isLoading } = useContext<any>(AuthContext);
    const [services, setServices] = React.useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    useMount(() => {
        fetchServices();
    });

    const { request, result, loading } = useApi({
        api: getServices,
    });

    const fetchServices = () => {
        request({})
            .then(result => {
                setServices(result?.data?.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getImage = (service: any) => {
        const s = services.find(s => s.id === service.id);
        return s?.attributes?.thumbnail?.data?.attributes?.formats?.large?.url || '';
    };

    const goToService = (service: any) => {
        navigate(`/creative/services/${service.id}`);
    };

    const handleAddService = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchServices();
    };

    return (
        <CreativePage>
            <div className="flex flex-row items-center mb-4">
                <div className="flex-1">
                    <h2 className="m-0 font-bold">my services</h2>
                    <p>
                        You currently have <b>{user?.services?.length} services</b> live.
                    </p>
                </div>
                <div className="flex flex-col grid-2">
                    <Button size="small" onClick={handleAddService} type="text" className="edit-button">
                        <span className="font-semibold">edit</span>
                    </Button>
                </div>
            </div>

            {isLoading || loading ? (
                <Skeleton />
            ) : (
                <div className="">
                    {user?.services?.length === 0 ? (
                        <div
                            className="h-96 w-full justify-center items-center content-center flex"
                            style={{ background: '#FAFAFA' }}
                        >
                            <div className="justify-center items-center content-center flex flex-col">
                                <p className="m-0 mb-1">You have no services yet.</p>
                                <Button type="primary" onClick={handleAddService} className="text-md">
                                    add service
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4 mb-24">
                            {user.services.map((service: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col grid-2"
                                        onClick={() => goToService(service)}
                                    >
                                        <ServiceCard
                                            photoUrl={getImage(service)}
                                            name={service?.name}
                                            color={service?.color}
                                            aspectRatio="1/1"
                                            height="200px"
                                            borderRadius="12px"
                                            fontSize="16px"
                                            shadow
                                        />
                                    </div>
                                );
                            })}
                            <div className="flex flex-col grid-2 flex-1">
                                <div
                                    className="w-full items-center flex justify-center p-4"
                                    style={{
                                        aspectRatio: '1/1',
                                        borderRadius: '18px',
                                        height: '150px',
                                        background: '#FAFAFA',
                                    }}
                                >
                                    <p className="text-center items-center m-0">
                                        <Button type="primary" onClick={handleAddService} size="small">
                                            <span className="font-semibold">add service</span>
                                        </Button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <CreativeServiceAddModal open={isModalOpen} onClose={closeModal} services={services} />
                </div>
            )}
        </CreativePage>
    );
};

export default CreativeServicesPage;
