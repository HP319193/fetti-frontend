import React, { MouseEvent } from 'react';
import { CardProps } from './CardProps';
import classnames from 'classnames';
import Text from '../Typography/Text';
import { StarOutlined, CheckCircleFilled } from '@ant-design/icons';

const Card = (props: any) => {
    const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
        if (props.onClick && !props.disabled) {
            props.onClick(event);
        }
    };

    const cardClassName = classnames(
        props.className,
        props.style === 'dashed'
            ? 'border-dashed border-1 border border-gray-300 items-center flex justify-center'
            : 'bg-white',
        props.disabled ? 'opacity-50 cursor-not-allowed' : '', // Apply styles for disabled
        'flex flex-col gap-2',
    );

    return (
        <div className={cardClassName} onClick={handleCardClick}>
            {props.image && (
                <div
                    style={{
                        backgroundImage: `url(${props.image})`,
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

export default Card;
