import React from 'react';
import Text from '../Typography/Text';
import { InfoCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip, message, notification } from 'antd';
import classnames from 'classnames';

interface FieldProps {
    label?: string;
    labelTooltip?: string;
    value: string;
    valueTooltip?: any;
    valueFontWeight?: string;
    valueClassName?: string;
    valueSize?: string;
    valueType?: string;
    className?: string;
    copyable?: boolean;
}

const copyValueToClipboard = (value: string) => {
    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    message.success(`Text copied to clipboard.`);
};

const Field: React.FC<FieldProps> = ({
    label,
    labelTooltip,
    value,
    valueTooltip,
    valueSize = 'text-sm',
    valueFontWeight = 'font-semibold',
    valueClassName,
    className,
    copyable,
    valueType = '',
}) => {
    return (
        <div className={className}>
            <div className="flex items-center gap-1">
                <Text type="label">{label}</Text>
                {labelTooltip && (
                    <Tooltip title={labelTooltip}>
                        <InfoCircleOutlined
                            style={{ fontSize: '12px', color: 'gray', cursor: 'pointer' }}
                        />
                    </Tooltip>
                )}
            </div>
            <div className="flex flex-row gap-1 items-center">
                <Text
                    fontWeight={valueFontWeight}
                    size={valueSize}
                    color="text-black-secondary"
                    className={classnames(valueClassName, 'mb-0')}
                    type={valueType}
                >
                    {valueTooltip ? (
                        <Tooltip title={valueTooltip}>
                            <span className="underline decoration-dotted cursor-pointer">
                                {value || '-'}
                            </span>
                        </Tooltip>
                    ) : (
                        value || '-'
                    )}
                </Text>
                {copyable && (
                    <Button
                        type="dashed"
                        size="small"
                        className="p-0 text-gray-200"
                        shape="circle"
                        onClick={() => copyValueToClipboard(value)}
                    >
                        <CopyOutlined className="text-gray-200" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Field;
