import React, { FunctionComponent, useCallback, useContext, useState } from 'react';
import { Button, Card, Skeleton, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import useMount from 'hooks/useMount';
import useApi from 'hooks/useApi';
import { getServices, updateBusiness } from 'services/message.service';
import classnames from 'clsx';
import { AuthContext } from 'context/AuthContext';

const CreativeSelectServices: FunctionComponent<any> = props => {
    const [data, setData] = useState([]);
    const [selectedServices, setSelectedServices] = useState<any>([]);
    const { user, business, setBusiness } = useContext<any>(AuthContext);

    const { request, result, loading } = useApi({
        api: getServices,
    });

    const {
        request: updateBusinessRequest,
        loading: updateBusinessLoading,
        result: updateBusinessResult,
    } = useApi({
        api: updateBusiness,
    });

    const fetchServices = useCallback(
        (requestState: {}) => {
            request(requestState)
                .then(result => {
                    let records = result?.data?.data?.map((c: any) => {
                        return {
                            ...c.attributes,
                            key: c.id,
                            id: c.id,
                        };
                    });
                    setData(records);
                })
                .catch(error => {
                    message.error(error.message);
                });
        },
        [request],
    );

    useMount(() => {
        fetchServices({});
    });

    const handleNext = useCallback(async () => {
        if (selectedServices.length === 0) {
            message.error('Please select at least one service.');
        } else {
            if (business) {
                const res = await updateBusinessRequest({
                    id: business.id,
                    body: {
                        data: {
                            services: {
                                set: selectedServices,
                            },
                        },
                    },
                });

                if (res.error) {
                    return;
                }

                const data = res.data;
                setBusiness(data.data);
                props.next?.();
                return;
            }
        }
    }, [selectedServices, business, props, setBusiness, updateBusinessRequest]);

    const handlePrev = useCallback(async () => {
        props.prev?.();
    }, [props]);

    const handleServiceClick = useCallback(
        (service: any) => {
            if (selectedServices.includes(service.id)) {
                setSelectedServices(selectedServices.filter((s: any) => s !== service.id));
            } else {
                setSelectedServices([...selectedServices, service.id]);
            }
        },
        [selectedServices],
    );

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="m-0 text-center">Dearest creative, we're a fan of what you do.</h3>
                <p className="m-0 text-md text-center">Which event service/s do you offer?</p>
                <span className="block text-center">Please select all that apply.</span>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {loading ? (
                    <>
                        <Skeleton.Button active={true} size="large" shape="default" block />
                        <Skeleton.Button active={true} size="large" shape="default" block />
                        <Skeleton.Button active={true} size="large" shape="default" block />
                        <Skeleton.Button active={true} size="large" shape="default" block />
                        <Skeleton.Button active={true} size="large" shape="default" block />
                    </>
                ) : (
                    data?.map((service: any) => {
                        return (
                            <div onClick={() => handleServiceClick(service)} className={classnames('cursor-pointer')}>
                                <Card
                                    key={service.id}
                                    hoverable
                                    cover={
                                        <img
                                            alt={service.thumbnail?.data?.attributes?.name}
                                            src={service.thumbnail?.data?.attributes?.formats?.large?.url}
                                        />
                                    }
                                    className={classnames(selectedServices.includes(service.id) ? 'opacity-70' : '')}
                                    style={{
                                        border: selectedServices.includes(service.id)
                                            ? 'solid 8px #e8107c'
                                            : 'solid 8px white',
                                    }}
                                >
                                    <Meta title={service.name} className="text-center" />
                                </Card>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="flex flex-row-reverse gap-2">
                <Button
                    type="primary"
                    onClick={handleNext}
                    disabled={selectedServices.length === 0 || updateBusinessLoading || loading}
                    loading={updateBusinessLoading}
                >
                    Next Step
                </Button>
                <Button onClick={handlePrev}>Previous Step</Button>
            </div>
        </div>
    );
};

export default CreativeSelectServices;
