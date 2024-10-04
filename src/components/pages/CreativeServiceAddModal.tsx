import React, { useCallback, useContext, useEffect, useState } from 'react';
import useApi from 'hooks/useApi';
import { passwordlessSendLink, updateUser } from 'services/message.service';
import { Button, Card, Divider, Input, Modal, Skeleton, message } from 'antd';
import useMount from 'hooks/useMount';
import Meta from 'antd/lib/card/Meta';
import classnames from 'classnames';
import { CloseOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { AuthContext } from 'context/AuthContext';
import ServiceCard from './ServiceCard';

export const CreativeServiceAddModal = (props: any) => {
    const { user, fetchUser } = useContext<any>(AuthContext);
    const [selectedServices, setSelectedServices] = useState<any>([]);

    const {
        request: updateUserRequest,
        loading: updateUserLoading,
        result: updateUserResult,
    } = useApi({
        api: updateUser,
    });

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
            fetchUser(data);

            message.success('services updated successfully');
            props.onClose();
            return;
        }
    }, [selectedServices, updateUserRequest, user, fetchUser, props]);

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

    useEffect(() => {
        if (props.services && user && user.services) {
            setSelectedServices(user.services.map((s: any) => s.id));
        }
    }, [props.services, user]);

    return (
        <Modal
            open={props.open}
            onOk={handleNext}
            onCancel={props.onClose}
            okButtonProps={{ loading: updateUserLoading, disabled: updateUserLoading, size: 'small' }}
            okText="Save"
            cancelButtonProps={{ disabled: updateUserLoading, size: 'small' }}
            cancelText={null}
            closable={false}
            width={1000}
            centered
        >
            <div className="text-center flex items-center flex-col w-full">
                <div className="grid grid-cols-6 gap-x-2 gap-y-4 w-full p-10" id="edit-services-modal">
                    {props.services?.map((service: any) => {
                        return (
                            <div
                                onClick={() => handleServiceClick(service)}
                                className={classnames(
                                    'cursor-pointer transition-all shadow hover:shadow-xl hover:border-gray-300 p-1',
                                )}
                                style={{
                                    background: selectedServices.includes(service.id) ? '#e8107c' : 'white',
                                    borderRadius: '12px',
                                }}
                            >
                                <ServiceCard
                                    photoUrl={service.attributes?.thumbnail?.data?.attributes?.formats?.large?.url}
                                    name={service.attributes?.name}
                                    color={service.attributes?.color}
                                    noShadow
                                    aspectRatio="1/1"
                                    borderRadius="12px"
                                    fontSize="16px"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default CreativeServiceAddModal;
