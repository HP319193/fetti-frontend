import { useEffect } from 'react';

// A hook that runs one time only after render

const useMount = (callback: Function) => {
    useEffect(() => {
        callback();
        //eslint-disable-next-line
    }, []);
};

export default useMount;
