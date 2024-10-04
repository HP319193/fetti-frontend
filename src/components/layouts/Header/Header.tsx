import { Avatar, Button, Dropdown, MenuProps, Modal, Skeleton, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import { AuthContext } from 'context/AuthContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import LogoutButton from '../LogoutButton';
import classnames from 'clsx';
import LoginModal from '../LoginModal';
import { isCreativeWorker, switchToCreativeWorker, switchToEventPlanner } from 'helpers';
import RegisterModal from '../RegisterModal';
import { CloseOutlined } from '@ant-design/icons';

const Header = (props: any) => {
    const { user, isLoading } = useContext<any>(AuthContext);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const showHome = () => {
        navigate('/');
    };

    const items: MenuProps['items'] = [
        {
            key: 'messages',
            label: (
                <button
                    className="bg-inherit border-transparent w-full text-left cursor-pointer opacity-40"
                    disabled
                    onClick={() => {
                        navigate('/messages');
                    }}
                >
                    messages
                </button>
            ),
        },
        {
            key: 'my-events',
            label: (
                <button
                    className="bg-inherit border-transparent w-full text-left cursor-pointer opacity-40"
                    disabled
                    onClick={() => {
                        navigate('/events');
                    }}
                >
                    my events
                </button>
            ),
        },
        {
            type: 'divider',
        },
        !user?.business_name
            ? {
                  key: 'become-a-vendor',
                  label: (
                      <button
                          className="bg-inherit border-transparent w-full text-left cursor-pointer font-semibold"
                          onClick={() => {
                              localStorage.setItem('role', 'creative-worker');
                              navigate('/register');
                          }}
                      >
                          become a <span className="text-fetti font-semibold">creative worker</span>
                      </button>
                  ),
              }
            : {
                  key: 'switch-role',
                  label: (
                      <button
                          className="bg-inherit border-transparent w-full text-left cursor-pointer opacity-40 font-semibold"
                          disabled
                          onClick={() => {
                              const creativeWorker = isCreativeWorker();
                              if (creativeWorker) {
                                  //   switchToEventPlanner();
                              } else {
                                  switchToCreativeWorker();
                              }
                          }}
                      >
                          {isCreativeWorker() ? 'switch to event planner' : 'switch to creative worker'}
                      </button>
                  ),
              },
        {
            type: 'divider',
        },
        {
            key: 'my-profile',
            label: (
                <button className="bg-inherit border-transparent w-full text-left opacity-40" disabled>
                    my profile
                </button>
            ),
        },
        {
            key: 'general-settings',
            label: (
                <button className="bg-inherit border-transparent w-full text-left opacity-40" disabled>
                    settings
                </button>
            ),
        },
        {
            key: 'help-support',
            label: (
                <button className="bg-inherit border-transparent w-full text-left opacity-40" disabled>
                    help & support
                </button>
            ),
        },
        {
            key: '0',
            label: <LogoutButton />,
        },
    ];

    const showLoginModal = () => {
        localStorage.setItem('navigate-back', window.location.pathname);
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const showRegisterModal = () => {
        localStorage.setItem('navigate-back', window.location.pathname);
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const isLanding = window.location.pathname === '/';

    return (
        <div
            className={classnames('pl-10 pr-12', 'main-header flex flex-col gap-4 items-center bg-white w-full')}
            style={{
                boxShadow: !props.affixed ? '0px 0 4px 4px rgba(0, 0, 0, 0.1)' : 'none',
                borderBottom: !props.affixed ? '1px solid #dfdfdf52' : 'none',
            }}
        >
            <div className="w-full flex items-center py-2">
                <div className="flex-1 items-center">
                    <img
                        src="/images/branding/logo.png"
                        alt="fetti logo"
                        className={classnames('cursor-pointer transition-all mr-4')}
                        style={{ height: '3.5rem' }}
                        onClick={showHome}
                    />
                </div>
                {/* <div className="w-96">
                    <Search className="rounded bg-slate-100" placeholder="Search..." bordered={false} enterButton />
                </div> */}

                <div className="flex-1 flex items-center" style={{ gap: '10px' }}>
                    <div className="flex-1"></div>
                    {!user && (
                        <div className="flex flex-row gap-2 landing">
                            <Button type="text" size="large" onClick={showLoginModal} className="secondary">
                                log in
                            </Button>

                            <Button type="primary" size="large" onClick={showRegisterModal}>
                                sign up
                            </Button>
                        </div>
                    )}
                    {user && (
                        <>
                            {/* <div className="rounded-full p-3 items-center flex text-center flex-col cursor-pointer hover:shadow hover:bg-slate-50">
                                <BellOutlined className="text-lg" />
                            </div> */}
                            <Dropdown menu={{ items }} className="cursor-pointer" placement="bottomRight">
                                <div className="rounded-full flex flex-row gap-1 items-center px-1 py-1 border border-solid border-slate-100">
                                    {props.loading && <Skeleton.Avatar shape="circle" active size="large" />}
                                    {!props.loading && (
                                        <a onClick={e => e.preventDefault()}>
                                            <Space>
                                                <Avatar
                                                    size="large"
                                                    shape="circle"
                                                    icon={<UserOutlined />}
                                                    src={user?.avatar_url}
                                                />
                                            </Space>
                                        </a>
                                    )}
                                </div>
                            </Dropdown>
                        </>
                    )}
                </div>
            </div>
            {/* {isLanding && (
                <div
                    className={classnames(
                        'text-center transition-all',
                        props.affixed ? 'max-h-0 h-0 opacity-0 p-0' : 'max-h-auto opacity-1 p-4 pb-8',
                    )}
                >
                    <h1 className="text-xl font-bold m-0">Making DIY event planning fun!</h1>
                    <span className="m-0 text-lg ">
                        Discover <span className="font-semibold">trustworthy creative workers</span> near you.
                    </span>
                </div>
            )} */}

            <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
            <RegisterModal open={isRegisterModalOpen} onClose={closeRegisterModal} />
        </div>
    );
};

export default Header;
