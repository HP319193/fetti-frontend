import React, { ReactNode, MouseEvent, useCallback } from 'react';
import classnames from 'classnames';
import { message } from 'antd';

export type TextProps = {
    size?: string;
    children: ReactNode;
    className?: string;
    color?: string;
    fontWeight?: string;
    onClick?: (event: MouseEvent<HTMLParagraphElement>) => void;
    type?: string;
};

const Text: React.FC<TextProps> = ({
    children,
    className,
    color,
    fontWeight,
    onClick,
    size,
    type = 'normal',
}) => {
    const handleUUIDClick = useCallback(
        (event: MouseEvent<HTMLParagraphElement>) => {
            const el = document.createElement('textarea');
            el.value = children as string;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            message.success(`Text copied to clipboard.`);
            onClick && onClick(event);
        },
        [onClick, children]
    );

    const textClassNames = classnames(
        {
            'text-gray text-xs mb-0': type === 'label',
            'text-blue cursor-pointer hover:text-blue-300 text-xs mb-0': type === 'link',
            'text-md mb-0': type === 'title',
            'text-sm mb-0': type === 'title-small',
            'text-lg mb-0': type === 'heading',
            'font-mono bg-slate-50 px-2 py-1 rounded text-xs text-gray-500 mb-0 cursor-pointer hover:text-gray-500':
                type === 'uuid',
        },
        color,
        size,
        fontWeight,
        className,
        'mb-0'
    );

    return type == 'uuid' ? (
        <p className={textClassNames} onClick={handleUUIDClick}>
            {children}
        </p>
    ) : (
        <p className={textClassNames} onClick={onClick}>
            {children}
        </p>
    );
};

export default Text;
