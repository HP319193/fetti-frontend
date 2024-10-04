import React, { useCallback, useEffect, useState } from "react";
import { Form, message, Modal } from "antd";
import { DeleteModalProps } from "./DeleteModalProps";
import Text from "components/basic/Typography/Text";

const DeleteModal = (props: DeleteModalProps) => {

    return (
        <Modal title="Delete Record"
            open={props.isModalOpen}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            confirmLoading={props.isLoading}
            okButtonProps={{ danger: true, size: 'large' }}
            cancelButtonProps={{ size: 'large', className: 'my-sm' }}
            okText="Yes"
        >
            <Text type='title'>Are you sure you want to delete this record?</Text>
        </Modal>
    );
};

export default DeleteModal;
