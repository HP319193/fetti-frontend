import "./Switch.scss";
import { Switch as AntSwitch, SwitchProps } from "antd";
import React, { FunctionComponent } from "react";

const Switch: FunctionComponent<SwitchProps> = (props) => {
    return <AntSwitch {...props} />;
};

export default Switch;