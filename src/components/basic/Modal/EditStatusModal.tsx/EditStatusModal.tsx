import React from "react";
import { Modal } from "antd";
import { EditStatusModalProps } from "./EditStatusModalProps";
import Text from "components/basic/Typography/Text";
import TextArea from "components/basic/TextArea";

const EditStatusModal = (props: EditStatusModalProps) => {

    return (
        <Modal title="Edit Status"
            open={props.isModalOpen}
            onOk={props.onConfirm}
            onCancel={props.onCancel}
            confirmLoading={props.isLoading}
            okButtonProps={{ size: 'large' }}
            cancelButtonProps={{ size: 'large', className: 'my-sm' }}
            okText="Update"
        >
            <Text size="text-md" fontWeight="font-semibold">{`You selected ${props.value}.`}</Text>
            <Text size="text-sm" fontWeight="font-normal" className="mb-0">Please enter the reason for update:</Text>
            <TextArea name="reason" onChange={props.onChange} value={props.reason}/>
        </Modal>
    );
};

export default EditStatusModal;
