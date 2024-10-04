import React from 'react';
import { Modal } from 'antd';
import { DataModalProps } from './DataModalProps';
import { Table } from 'components/basic';

const DataModal = (props: DataModalProps) => {
    return (
        <Modal
            title={props.title}
            open={props.isModalOpen}
            onOk={props.onCancel}
            onCancel={props.onCancel}
            width={props.width ?? 520}
            // confirmLoading={props.isLoading}
            okButtonProps={{ size: 'large' }}
            cancelButtonProps={{ size: 'large', className: 'my-sm' }}
            cancelText="Close"
        >
            <Table columns={props.modalColumns} dataSource={props.modalData} />
        </Modal>
    );
};

export default DataModal;
