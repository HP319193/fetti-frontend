import React, { useCallback, useState } from 'react';
import useApi from 'hooks/useApi';
import { passwordlessSendLink } from 'services/message.service';
import { Button, Card, Divider, Input, Modal, message } from 'antd';
import useMount from 'hooks/useMount';
import Meta from 'antd/lib/card/Meta';
import classnames from 'classnames';
import { CloseOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

export const RegisterModal = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
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
        setIsTermsModalOpen(true);
    };

    const handleOk = () => {
        setIsTermsModalOpen(false);
    };

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        localStorage.setItem('role', role);
    };

    useMount(() => {
        // const role = localStorage.getItem('role');
        const role = 'creative-worker';
        if (role) {
            setSelectedRole(role);
        } else {
            localStorage.setItem('role', 'event-planner');
            setSelectedRole('event-planner');
        }
    });

    const handleLoginModalOk = () => {
        setEmail('');
        setSent(false);
        props.onClose?.();
    };

    return (
        <Modal
            open={props.open}
            onOk={handleLoginModalOk}
            onCancel={handleLoginModalOk}
            cancelText={null}
            footer={false}
            closable={false}
            width={900}
            centered
        >
            <div className="text-center px-8 pt-8 flex items-center flex-col w-full">
                <div
                    className="absolute p-4 text-md cursor-pointer"
                    style={{ top: '0', right: '0' }}
                    onClick={handleLoginModalOk}
                >
                    <CloseOutlined />
                </div>
                {sent ? (
                    <div className="pb-8">
                        <h1 className="font-bold m-0" style={{ letterSpacing: '-1px' }}>
                            check your <span className="text-fetti-pink font-bold">email</span>.
                        </h1>
                        <p className="text text-sm m-0 mt-4">
                            A <span className="text-fetti font-semibold">magic link</span> has been sent to your email{' '}
                            <b className="text-fetti font-semibold">{email}</b> for verification.
                        </p>
                        <p className="text-sm text-slate-500">
                            Click on the link to verify your email and proceed with your sign-up.
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className="font-bold m-0" style={{ lineHeight: '32px' }}>
                            awesome seeing you here!
                        </h1>
                        <p className="text-md m-0 mb-4">which account would you like to make?</p>

                        <div className="gap-2 flex flex-col p-4 items-center w-full">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-8">
                                    <div
                                        className={classnames(
                                            'cursor-arrow text-md font-semibold rounded px-4 py-2 transition-all flex flex-col opacity-80',
                                        )}
                                        // onClick={() => handleRoleChange('event-planner')}
                                    >
                                        <div
                                            className="w-full border-solid border-slate-100 rounded border-4 mb-2"
                                            style={{
                                                borderColor: selectedRole == 'event-planner' ? '#e8107c' : '',
                                                color: selectedRole == 'event-planner' ? '#e8107c' : 'inherit',
                                                backgroundImage: 'url("/images/misc/event-planner.png")',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center center',
                                                width: '230px',
                                                height: '200px',
                                            }}
                                        ></div>
                                        <p className="text-md">I'm planning an event</p>
                                    </div>

                                    <div
                                        className={classnames(
                                            'cursor-pointer text-md font-semibold rounded px-4 py-2 transition-all flex flex-col',
                                        )}
                                        onClick={() => handleRoleChange('creative-worker')}
                                    >
                                        <div
                                            className="w-full border-solid border-slate-100 rounded border-4 mb-2"
                                            style={{
                                                borderColor: selectedRole == 'creative-worker' ? '#e8107c' : '',
                                                color: selectedRole == 'creative-worker' ? '#e8107c' : 'inherit',
                                                backgroundImage: 'url("/images/misc/creative-worker.png")',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center center',
                                                width: '230px',
                                                height: '200px',
                                            }}
                                        ></div>
                                        <p className="text-md">I'm a creative vendor</p>
                                    </div>
                                </div>
                            </div>

                            <p className="m-0">
                                By signing-up, you agree with our{' '}
                                <span className="font-semibold cursor-pointer" onClick={showModal}>
                                    terms & conditions
                                </span>
                                .
                            </p>

                            <div className="flex flex-col gap-4 items-center pb-8 w-80">
                                <div className="flex-1 flex flex-col items-center w-full">
                                    <div className="flex flex-1 flex-col gap-2 w-full">
                                        <Input
                                            size="large"
                                            placeholder="juan@company.com"
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            onPressEnter={handleNext}
                                            className="w-full"
                                        />
                                        <Button
                                            size="large"
                                            type="primary"
                                            onClick={handleNext}
                                            loading={loading}
                                            disabled={loading}
                                        >
                                            sign-up
                                        </Button>
                                    </div>
                                </div>

                                {/* <div className="flex-1 flex flex-col items-center">
                                    <p className="text-sm m-0 mb-2 text-slate-400">
                                        or sign-up using your google account
                                    </p>
                                    <div className="flex flex-1 flex-row gap-2 w-full">
                                        <Button className="w-full" size="large" icon={<GoogleOutlined />}>
                                            sign-up with google
                                        </Button>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <Modal
                            title="Terms and Conditions"
                            open={isTermsModalOpen}
                            onOk={handleOk}
                            onCancel={handleOk}
                            cancelText={null}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default RegisterModal;
