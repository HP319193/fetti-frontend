import React, { MouseEventHandler, ReactNode } from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import classnames from 'classnames';
import styles from './Button.scss';

interface ButtonProps {}

const Button: React.FC<ButtonProps & AntButtonProps> = props => {
    return (
        <AntButton
            {...props}
            className={classnames(
                'h-auto focus:outline-none flex flex-col items-center align-center justify-center text-sm',
                styles.button,
            )}
        >
            {props.children}
        </AntButton>
    );
};

export default Button;
