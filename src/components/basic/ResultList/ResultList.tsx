import "./ResultList.scss";
import { Select as AntSelect, SelectProps } from "antd";
import React, { FunctionComponent } from "react";
import { ResultListProps } from "./ResultListProps";
import Table from "../Table";
import ActionBar from "../ActionBar";
import { ActionBarProps } from "../ActionBar/ActionBarProps";
import { TableProps } from "antd/es/table";

const ResultList: FunctionComponent<ResultListProps & ActionBarProps & TableProps<any>> = (props) => {
    return (
        <div className="flex flex-col gap-4">
            <ActionBar {...props} />
            <Table {...props}></Table>
        </div>
    );
};

export default ResultList;