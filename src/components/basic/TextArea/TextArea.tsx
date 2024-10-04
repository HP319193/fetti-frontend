import React from 'react';
import "./TextArea.scss";
import { Input } from 'antd';
const { TextArea } = Input;
import { TextAreaProps } from 'antd/lib/input';

const CustomTextArea = (props: TextAreaProps & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<HTMLDivElement> | undefined;
}) => {
    return (
        <TextArea {...props} />
    )
};

export default CustomTextArea;
