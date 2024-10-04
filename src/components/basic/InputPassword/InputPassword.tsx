import React from "react";
import "./InputPassword.scss";
import { Input as AntInput, InputProps, InputRef } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const Input = (props: InputProps & React.RefAttributes<InputRef>) => {
    return <AntInput.Password {...props} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />;
};

export default Input;