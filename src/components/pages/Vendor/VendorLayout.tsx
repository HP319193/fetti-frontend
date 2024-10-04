import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Button, Input, LogoutButton, NavBar } from 'components';
import { Menu, MenuProps, DrawerProps, Alert, Skeleton, Divider, Affix } from 'antd';
import { useNavigate } from 'react-router-dom';
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
import { AuthContext } from 'context/AuthContext';
import Sidebar from 'components/layouts/Sidebar';
import Footer from 'components/layouts/Footer';

const VendorLayout = (
    props: any & {
        children?: React.ReactNode;
    } & {
        ref?: React.Ref<HTMLDivElement> | undefined;
    },
) => {
    const { isLoading } = useContext<any>(AuthContext);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <LogoutButton />,
        },
    ];

    const sidebarItems = [
        {
            label: 'My Calendar',
            key: '/vendor',
            path: '/vendor',
            icon: <CalendarOutlined />,
        },
        {
            label: 'For Approval',
            key: '/for-approval',
            path: '/for-approval',
            icon: <BellOutlined />,
        },
        {
            label: 'My Messages',
            key: '/messages',
            path: '/messages',
            icon: <MailOutlined />,
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
        {
            label: !collapsed ? 'Settings' : '',
            key: 'set-up',
            type: 'group',
            children: [
                {
                    label: 'My Profile',
                    key: 'my-profile',
                    path: '/my-services',
                    icon: <UserOutlined />,
                },
                {
                    label: 'My Services',
                    key: 'my-services',
                    path: '/my-services',
                    icon: <SmileOutlined />,
                },
                {
                    label: 'General Settings',
                    key: 'settings',
                    path: '/settings',
                    icon: <SettingOutlined />,
                },
            ],
        },
        {
            label: 'Help & Support',
            key: '/help',
            path: '/help',
            icon: <MedicineBoxOutlined />,
        },
    ];

    const onClickSidebar = (e: any) => {
        let path = e.keyPath.join('/');
        navigate(path);
    };

    const showDefaultDrawer = () => {
        setSize('default');
        setOpen(true);
    };

    const showCreativesRegistration = () => {
        navigate('/creatives-registration');
    };

    const showCreativesDashboard = () => {
        navigate('/vendor');
    };

    const showHome = () => {
        navigate('/');
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Affix offsetTop={80}>
                <div className="w-64">
                    <Sidebar loading={isLoading} />
                    <Divider />
                    <Footer loading={isLoading} />
                </div>
            </Affix>

            <Skeleton loading={isLoading} active />
            <Skeleton loading={isLoading} active />

            {!isLoading && props.children}
        </>
    );
};

export default VendorLayout;
