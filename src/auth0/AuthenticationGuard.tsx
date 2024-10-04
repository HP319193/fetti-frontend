import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Spin } from 'antd';
import React, { ComponentType, ReactNode } from 'react';

export const AuthenticationGuard = ({ component }: any) => {
    // const Component = withAuthenticationRequired(component, {
    //     onRedirecting: () => (
    //         <div className="page-layout">
    //             <Spin />
    //         </div>
    //     ),
    // });

    // return <Component />;

    return <div>{component}</div>;
};
