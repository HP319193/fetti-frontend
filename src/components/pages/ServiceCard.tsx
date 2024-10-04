import React, { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

const ServiceCard = (props: any) => {
    return (
        <div className="w-full service-card">
            <div
                style={{
                    backgroundImage: `url(${props.photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    aspectRatio: props.aspectRatio,
                    width: '100%',
                    borderRadius: props.borderRadius || '18px',
                    opacity: props.activeService === props.service ? 1 : 0.9,
                    // boxShadow:
                    //     !props.name || props.noShadow
                    //         ? 'none'
                    //         : 'rgb(41 41 41 / 20%) 0px 8px 9px 0px, rgb(41 39 39 / 12%) 0px 7px 8px 0px',
                }}
                className={classnames(
                    'cursor-pointer transition-all pb-8',
                    props.shadow ? 'shadow-lg hover:shadow-xl' : '',
                )}
            >
                <span
                    className="w-full text-lg font-semibold block"
                    style={{
                        color: props.color,
                        fontSize: props.fontSize || '22px',
                    }}
                >
                    {props.name}
                </span>
            </div>
            {props.active && <span className="selected-card"></span>}
        </div>
    );
};

export default ServiceCard;
