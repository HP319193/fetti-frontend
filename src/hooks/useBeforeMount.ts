import { useMemo } from "react"

const useBeforeMount = (callback: Function) => {
    useMemo(() => {
        callback();
    }, [callback]);
};

export default useBeforeMount;