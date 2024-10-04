import React from "react";
import "./Checkbox.scss";
import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';

const Checkbox = (props: CheckboxProps & React.RefAttributes<HTMLInputElement>) => {
    return <AntCheckbox {...props} />;
};

export default Checkbox;