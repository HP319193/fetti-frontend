import { useCallback, useState } from 'react';
import { mapObject, mapObjects } from '../services/object.service';

interface UseApiOptions {
    api: (params: any) => Promise<any>;
    params?: any;
    handleOwnError?: boolean | { [key: string]: Function };
    mapper?: any;
    isArray?: boolean;
    paramsMapper?: any;
    returnMappedData?: boolean;
    pageError?: boolean;
}

interface UseApiResult {
    request: (params?: any) => Promise<any>;
    loading: boolean | undefined;
    result: any;
    error: boolean;
    mappedData: any;
    submittedParams: any;
}

type ErrorHandlers = {
    gateway: () => void;
    network: () => void;
    unauthorized: () => void;
    server: () => void;
    badrequest: () => void;
};

const useApi = ({
    api,
    params = {},
    handleOwnError = false,
    mapper,
    isArray = false,
    paramsMapper,
    returnMappedData = false,
    pageError = false,
}: UseApiOptions): UseApiResult => {
    const [loading, setLoading] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [result, setResult] = useState<any>();
    const [mappedData, setMappedData] = useState<any>(isArray ? [] : {});
    const [submittedParams, setSubmittedParams] = useState<any>({});
    // const { globalErrorModal, setGlobalError } = useContext(AppContext);

    const mapData = useCallback(
        (res: any, params: any) => {
            let obj: Record<string, any> = {};
            if (isArray) {
                obj = mapObjects(res.data ? [...res.data] : [...res], mapper, {
                    ...params,
                });
            } else {
                if (res.data) {
                    obj = mapObject({ ...res.data }, mapper, { ...params });
                } else {
                    obj = mapObject({ ...res }, mapper, { ...params });
                }
            }
            setMappedData(obj);
            return obj;
        },
        [mapper, isArray]
    );

    const request = useCallback(
        async (p: any) => {
            setLoading(true);
            setError(false);
            try {
                setSubmittedParams({ ...params, ...p });
                const parameter = paramsMapper
                    ? mapObject({ ...params, ...p }, paramsMapper)
                    : { ...params, ...p };
                const res = await api(parameter);
                setResult(res);
                setLoading(false);
                if (res) {
                    const mappedDataResponse = mapData(res, parameter);
                    if (returnMappedData) {
                        return mappedDataResponse;
                    }
                }

                return res;
            } catch (err: any) {
                console.log(err, "err")
                const metadata = err?.metadata;
                const code = metadata?.code;
                err.code = code;
                setError(true);
                setLoading(false);

                const getErrorResponse = (type: string, defaultError: Function) => {
                    if (
                        (typeof handleOwnError === 'object' && handleOwnError[type]) ||
                        (typeof handleOwnError === 'boolean' && handleOwnError)
                    ) {
                        if (
                            typeof handleOwnError === 'object' &&
                            handleOwnError[type] &&
                            typeof handleOwnError[type] === 'function'
                        ) {
                            handleOwnError[type]();
                        } else {
                            throw err;
                        }
                    } else {
                        defaultError();
                    }
                };

                const showErrorAppState = () => {
                    // globalErrorModal.show();
                };

                err.handleError = () => {
                    showErrorAppState();
                };

                if (pageError) {
                    // setGlobalError(true);
                    throw err;
                }

                const obj = {
                    gateway: () => {
                        // setGlobalError(true);
                        throw err;
                    },
                    network: () => {
                        // getErrorResponse("network", () => showErrorAppState());
                        throw err;
                    },
                    unauthorized: () => {
                        if (code === '1003') {
                            localStorage.removeItem('accessToken');
                            throw err;
                        }
                        if (
                            typeof handleOwnError === 'object' &&
                            handleOwnError !== null &&
                            handleOwnError.hasOwnProperty('unauthorized')
                        ) {
                            const unknownHandleOwnError = handleOwnError as unknown;
                            const handleOwnErrorWithBadRequest =
                                unknownHandleOwnError as {
                                    unauthorized: { [key: string]: () => void };
                                };

                            const handler = handleOwnErrorWithBadRequest.unauthorized;
                            if (
                                code &&
                                typeof handler === 'object' &&
                                handler.hasOwnProperty(code)
                            ) {
                                handler[code]();
                            } else {
                                showErrorAppState();
                            }
                        } else {
                            showErrorAppState();
                        }
                        throw err;
                    },
                    server: () => {
                        getErrorResponse('server', () => showErrorAppState());
                        throw err;
                    },
                    badrequest: () => {
                        if (
                            typeof handleOwnError === 'object' &&
                            handleOwnError !== null &&
                            handleOwnError.hasOwnProperty('badrequest')
                        ) {
                            const unknownHandleOwnError = handleOwnError as unknown;
                            const handleOwnErrorWithBadRequest =
                                unknownHandleOwnError as {
                                    badrequest: { [key: string]: () => void };
                                };

                            const handler = handleOwnErrorWithBadRequest.badrequest;
                            if (
                                code &&
                                typeof handler === 'object' &&
                                handler.hasOwnProperty(code)
                            ) {
                                handler[code]();
                            } else {
                                getErrorResponse('badrequest', () => showErrorAppState());
                            }
                        } else {
                            getErrorResponse('badrequest', () => showErrorAppState());
                        }
                        throw err;
                    },
                };

                if (obj.hasOwnProperty(err.error)) {
                    const errorKey = err.error as keyof ErrorHandlers; // Assert the type of err.error to a valid key of ErrorHandlers
                    obj[errorKey]();
                } else {
                    showErrorAppState();
                    throw err;
                }
            }
        },
        [
            params,
            api,
            handleOwnError,
            paramsMapper,
            // globalErrorModal,
            mapData,
            returnMappedData,
            // setGlobalError,
            pageError,
        ]
    );

    return { request, loading, result, error, mappedData, submittedParams };
};

export default useApi;
