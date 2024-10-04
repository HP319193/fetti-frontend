import { Menu, Skeleton } from 'antd';
import React, { useContext } from 'react';
import axios from 'axios';
import useMount from 'hooks/useMount';
import { PopupButton } from '@typeform/embed-react';
import {
    UserOutlined,
    CalendarOutlined,
    BellOutlined,
    SettingOutlined,
    WalletOutlined,
    AuditOutlined,
    MedicineBoxOutlined,
    SmileOutlined,
    StarOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';

const Sidebar = ({ loading }: any) => {
    const navigate = useNavigate();

    const sidebarItems = [
        {
            label: 'My Calendar',
            key: '/vendor/calendar',
            path: '/vendor/calendar',
            icon: <CalendarOutlined />,
        },
        {
            label: 'My Services',
            key: 'my-services',
            path: '/my-services',
            icon: <SmileOutlined />,
        },
        {
            label: 'For Approval',
            key: '/for-approval',
            path: '/for-approval',
            icon: <BellOutlined />,
        },
        {
            label: 'My Reviews',
            key: '/reviews',
            path: '/reviews',
            icon: <StarOutlined />,
        },
        {
            label: 'My Payouts',
            key: '/payouts',
            path: '/payouts',
            icon: <WalletOutlined />,
        },
        {
            label: 'Contracts',
            key: '/contracts',
            path: '/contracts',
            icon: <AuditOutlined />,
        },
    ];

    const onClickSidebar = (e: any) => {
        let path = e.keyPath.join('/');
        navigate(path);
    };

    return (
        <div className="flex flex-col rounded-lg overflow-x-auto mt-4">
            <div className="mt-4">
                <Skeleton loading={loading} active />
                {!loading && (
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['/vendor/calendar']}
                        mode="inline"
                        items={sidebarItems}
                        onClick={onClickSidebar}
                        style={{ background: 'transparent' }}
                    />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
