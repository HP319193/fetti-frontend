import "./Select.scss";
import { Select as AntSelect, SelectProps } from "antd";
import React, { FunctionComponent } from "react";

const Button: FunctionComponent<SelectProps> = (props) => {
    return <AntSelect {...props} />;
};

export default Button;