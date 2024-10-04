import React from 'react';
import { Table as AntTable } from 'antd';
import type { TableProps } from 'antd/es/table';
import './Table.scss';
interface Props extends TableProps<any> {
    children?: React.ReactNode;
    error?: boolean;
}

const Table = (props: Props) => {
    const { error, ...restProps } = props;

    return (
        <div>
            {error ? (
                <div className="error">Error fetching the list. Please try again later.</div>
            ) : props.loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <AntTable {...restProps} />
            )}
        </div>
    );
};

export default Table;
