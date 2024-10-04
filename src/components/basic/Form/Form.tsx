import React from "react";
import { Form as AntForm } from 'antd';
import { FormProps } from "antd/es/form/Form";

const Form = (props: FormProps & {
    children?: React.ReactNode;
}) => {
    return <AntForm {...props} />;
};

export default Form;