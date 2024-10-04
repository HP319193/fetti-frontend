import React, { FunctionComponent } from 'react';
import { StarOutlined, CheckCircleFilled } from '@ant-design/icons';

const ServiceCard: FunctionComponent<any> = (props: any) => {
    return (
        <div className="flex flex-col gap-2" onClick={props.onClick}>
            {props.image && (
                <div
                    style={{
                        backgroundImage: `url('${props.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        aspectRatio: '1/1',
                        width: '100%',
                        borderRadius: '0.5rem',
                    }}
                >
                    {props.verified && (
                        <div
                            className="font-semibold w-full flex text-right p-2 align-middle flex items-center"
                            style={{
                                color: 'white',
                            }}
                        >
                            <div className="flex-1"></div>
                            <CheckCircleFilled className="text-md mr-1" />
                            &nbsp;<span className="text-sm">Verified</span>
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="flex flex-row items-center">
                    <p className="m-0 font-semibold flex-1">{props.product}</p>
                    <div className="font-semibold flex items-center gap-1">
                        <StarOutlined />
                        <span className="font-semibold">5.0</span>
                    </div>
                </div>

                <p className="m-0">
                    Starts at <span className="font-semibold">{props.startingPrice}</span>
                </p>
                <p className="m-0">{props.location}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
