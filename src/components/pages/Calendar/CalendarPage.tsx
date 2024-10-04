import React, { FunctionComponent } from 'react';
import { ButtonProps, Divider } from 'antd';
import classnames from 'clsx';
import { Text } from 'components/basic';
import { useNavigate } from 'react-router-dom';
import VendorLayout from '../Vendor/VendorLayout';

const CalendarPage = () => {
    return (
        <VendorLayout>
            <div className="flex flex-col gap-10">Calendar will show here.</div>
        </VendorLayout>
    );
};

export default CalendarPage;
