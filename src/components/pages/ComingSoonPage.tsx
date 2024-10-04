import React, { FunctionComponent } from 'react';
import { ButtonProps, Divider } from 'antd';
import classnames from 'clsx';
import { Text } from 'components/basic';
import { useNavigate } from 'react-router-dom';
import VendorLayout from './Vendor/VendorLayout';
import useMount from 'hooks/useMount';

const ComingSoonPage = () => {
    const navigate = useNavigate();
    useMount(() => {
        console.log('mounted coming soon');
    });
    return <div className="flex flex-col gap-10">This feature is coming soon.</div>;
};

export default ComingSoonPage;
