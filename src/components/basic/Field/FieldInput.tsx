import React, { ChangeEvent } from 'react';
import { Input, InputProps } from 'antd';

interface FieldProps extends InputProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, ...restProps }) => {
    return (
        <div>
            <label>{label}</label>
            <div className="field-input-container">
                <Input value={value} onChange={onChange} {...restProps} />
            </div>
        </div>
    );
};

export default Field;
