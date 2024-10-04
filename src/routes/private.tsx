import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLogin } from './../utils';

function render(c: JSX.Element) {
    return c;
}

const Private = (Component: JSX.Element) => {
    const [hasSession, setHasSession] = useState<boolean>(false);

    useEffect(() => {
        (async function () {
            setHasSession(Boolean(isLogin()));
        })();
    }, [hasSession, Component]);

    // return hasSession ? render(Component) : <Navigate to="login" />;
    return render(Component);
};

export default Private;
