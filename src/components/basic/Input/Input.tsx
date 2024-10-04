import React from "react";
import "./Input.scss";
import { Input as AntInput, InputProps, InputRef } from 'antd';

const Input = (props: InputProps & React.RefAttributes<InputRef>) => {
    return <AntInput {...props} />;
};

export default Input;