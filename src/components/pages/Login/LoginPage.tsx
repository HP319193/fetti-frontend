import React, { FunctionComponent, useCallback, useState } from 'react';
import styles from './LoginPage.module.scss';
import LoginLayout from 'components/layouts/LoginLayout/LoginLayout';
import { Button, Input } from 'components/basic';
import useApi from 'hooks/useApi';
import { passwordlessSendLink } from 'services/message.service';
import { Card, Modal, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import classnames from 'clsx';
import useMount from 'hooks/useMount';

const LoginPage: FunctionComponent = props => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('event-planner');

    const {
        request,
        loading: requestLoading,
        result,
    } = useApi({
        api: passwordlessSendLink,
    });

    const error = () => {
        message.error('There was an error in your request. Please try again.');
    };

    const handleNext = useCallback(async () => {
        setLoading(true);
        try {
            const res = await request({ email, username: email });

            console.log('DONE!');
            console.log(res);

            if (res.error) {
                error();
            }

            const data = res.data;
            if (data.sent) {
                setSent(true);
            }

            setLoading(false);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [email, request]);

    const handleBack = useCallback(() => {
        setSent(false);
        setEmail('');
    }, [setEmail, setSent]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        localStorage.setItem('role', role);
    };

    useMount(() => {
        const role = localStorage.getItem('role');
        if (role) {
            setSelectedRole(role);
        } else {
            localStorage.setItem('role', 'event-planner');
            setSelectedRole('event-planner');
        }
    });

    return (
        <>
            <LoginLayout
                component={
                    <div className="w-80 gap-2 flex flex-col">
                        {sent ? (
                            <div>
                                <p className="text text-md">
                                    A confirmation link has been sent to your email <b>{email}</b> for you to log-in.
                                    Please check your email and click on the link!
                                </p>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleBack}
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Back
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="w-90 flex gap-4">
                                    <Card
                                        key="event-planner"
                                        hoverable
                                        cover={<img alt="event-planner" src="/images/misc/event-planner.png" />}
                                        className={classnames(selectedRole == 'event-planner' ? 'opacity-70' : '')}
                                        style={{
                                            border:
                                                selectedRole == 'event-planner'
                                                    ? 'solid 8px #e8107c'
                                                    : 'solid 8px white',
                                        }}
                                        onClick={() => handleRoleChange('event-planner')}
                                    >
                                        <Meta title="Event Planner" className="text-center" />
                                    </Card>
                                    <Card
                                        key="creative-worker"
                                        hoverable
                                        cover={<img alt="creative-worker" src="/images/misc/creative-worker.png" />}
                                        className={classnames(selectedRole == 'creative-worker' ? 'opacity-90' : '')}
                                        style={{
                                            border:
                                                selectedRole == 'creative-worker'
                                                    ? 'solid 8px #e8107c'
                                                    : 'solid 8px white',
                                        }}
                                        onClick={() => handleRoleChange('creative-worker')}
                                    >
                                        <Meta title="Creative Worker" className="text-center" />
                                    </Card>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Input
                                        size="large"
                                        placeholder="juan@company.com"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        onPressEnter={handleNext}
                                    />
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleNext}
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Log-in
                                    </Button>
                                </div>

                                <p className="m-0">
                                    By logging in, you agree with our{' '}
                                    <span className="font-semibold cursor-pointer" onClick={showModal}>
                                        Terms & Conditions
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                }
            />
            <Modal
                title="Terms and Conditions"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
                cancelText={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default LoginPage;
