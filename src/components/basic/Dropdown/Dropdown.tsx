import "./Dropdown.scss";
import { Dropdown as AntDropdown, DropdownProps } from "antd";
import React, { FunctionComponent } from "react";

const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    return <AntDropdown {...props} />;
};

export default Dropdown;