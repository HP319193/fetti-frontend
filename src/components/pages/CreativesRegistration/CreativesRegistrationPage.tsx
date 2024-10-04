import React, { FunctionComponent, useState } from 'react';
import styles from './DashboardPage.module.scss';
import { Button, ButtonProps, Card, Divider, Drawer, DrawerProps, Space, Steps, message } from 'antd';
import classnames from 'clsx';
import { Text } from 'components/basic';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';
import useMount from 'hooks/useMount';
import CreativeSelectServices from './CreativeSelectServices';
import CreativeDetails from './CreativeDetails';
import CreativeVerification from './CreativeVerification';

const CreativesRegistrationPage: FunctionComponent<any> = props => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [businessDetails, setBusinessDetails] = useState({});

    useMount(() => {});

    const next = () => {
        if (current === 2) {
            navigate('/vendor');
            return;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Business Details',
            content: <CreativeDetails setBusinessDetails={setBusinessDetails} next={next} />,
        },
        {
            title: 'Services',
            content: <CreativeSelectServices prev={prev} next={next} />,
        },
        {
            title: 'Verification',
            content: <CreativeVerification prev={prev} next={next} />,
        },
    ];

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    return (
        <div className="flex flex-row bg-slate-50 rounded shadow-md mb-2">
            {current == 0 && (
                <div className="w-1/3">
                    <img src="/images/events/creative-registration.png" className="w-full rounded-l" />
                </div>
            )}

            <div className="flex flex-1 flex-col gap-4 p-12">
                <div>
                    <h1 className="m-0">Register as a Creative Worker</h1>
                    <p className="m-0 text-lg">Registering your business with fetti is as easy as 1-2-3!</p>
                </div>
                <Steps current={current} items={items} />
                <div className="flex-1">
                    <div className="steps-content">{steps[current].content}</div>
                </div>
            </div>
        </div>
    );
};

export default CreativesRegistrationPage;
