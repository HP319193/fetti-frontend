import React, { FunctionComponent } from 'react';
import useMount from 'hooks/useMount';
import { DashboardLayout, Footer } from 'components/layouts';
import {
    UserOutlined,
    CalendarOutlined,
    MailOutlined,
    BellOutlined,
    SmileOutlined,
    CameraOutlined,
    FileDoneOutlined,
    SettingOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import classnames from 'clsx';
import { Affix, Avatar, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import FooterContent from 'components/layouts/FooterContent';

const CreativePageMenuItem = (props: any) => {
    const navigate = useNavigate();
    return (
        <span
            className={classnames(
                'capitalize text-sm w-full text-left rounded px-4 py-2 cursor-pointer items-center flex gap-4 hover:bg-slate-100',
                props.active ? 'text-black font-bold' : props.disabled ? 'text-slate-300' : 'text-slate-600',
            )}
            style={{ fontSize: '16px' }}
            onClick={() => {
                if (props.active) return;
                if (props.disabled) return;
                navigate(props.to);
            }}
        >
            {props.children}
        </span>
    );
};

const CreativePage = (props: any) => {
    useMount(() => {
        console.log('mounted creative layout page');
    });

    const isActive = (path: string) => {
        return window.location.pathname.indexOf(path) === 0;
    };

    return (
        <div className="flex gap-16 w-full h-full flex-1">
            <div className="w-80 h-full pl-8 pr-2" style={{ background: '#FAFAFA' }}>
                <Affix offsetTop={120}>
                    <div className="flex flex-col items-center gap-2">
                        <CreativePageMenuItem active={isActive('/creative/profile')} to="/creative/profile">
                            my profile
                        </CreativePageMenuItem>

                        <CreativePageMenuItem active={isActive('/creative/services')} to="/creative/services">
                            my services
                        </CreativePageMenuItem>

                        <CreativePageMenuItem to="/creative/messages" disabled>
                            my messages
                        </CreativePageMenuItem>

                        <CreativePageMenuItem to="/creative/approval" disabled>
                            for approval
                        </CreativePageMenuItem>

                        <CreativePageMenuItem active={isActive('/creative/calendar')} to="/creative/calendar" disabled>
                            my calendar
                        </CreativePageMenuItem>

                        <CreativePageMenuItem active={isActive('/creative/events')} to="/creative/events" disabled>
                            my events
                        </CreativePageMenuItem>

                        <CreativePageMenuItem
                            active={isActive('/creative/contracts')}
                            to="/creative/contracts"
                            disabled
                        >
                            contracts
                        </CreativePageMenuItem>

                        <CreativePageMenuItem active={isActive('/creative/settings')} to="/creative/settings" disabled>
                            settings
                        </CreativePageMenuItem>

                        <CreativePageMenuItem active={isActive('/creative/help')} to="/creative/help" disabled>
                            help & support
                        </CreativePageMenuItem>
                    </div>
                </Affix>
            </div>
            <div className="w-full h-full py-8 pr-16">{props.children}</div>
        </div>
    );
};

export default CreativePage;
