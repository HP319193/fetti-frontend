import React, { FunctionComponent, useCallback, useContext, useState } from 'react';
import styles from './LoginPage.module.scss';
import LoginLayout from 'components/layouts/LoginLayout/LoginLayout';
import { Button, Input, TextArea } from 'components/basic';
import useApi from 'hooks/useApi';
import { passwordlessSendLink, updateBusiness } from 'services/message.service';
import { Modal, Upload, message } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { InboxOutlined } from '@ant-design/icons';
import { getToken } from 'helpers';
import { AuthContext } from 'context/AuthContext';
import useMount from 'hooks/useMount';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const CreativeVerification = (props: any) => {
    const { user } = useContext<any>(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { Dragger } = Upload;

    const {
        request: updateBusinessRequest,
        loading: updateBusinessLoading,
        result: updateBusinessResult,
    } = useApi({
        api: updateBusiness,
    });

    const businessRegistrationProps: UploadProps = {
        name: 'files',
        multiple: true,
        accept: 'image/*,.pdf,.doc,.docx',
        action: `${apiServerUrl}/api/upload`,
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
        withCredentials: true,
        maxCount: 1,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // const handleNext = useCallback(async () => {
    //     if (business) {
    //         const res = await updateBusinessRequest({
    //             id: business.id,
    //             body: {
    //                 data: {
    //                     status: 'for review',
    //                 },
    //             },
    //         });

    //         if (res.error) {
    //             return;
    //         }

    //         const data = res.data;
    //         message.success('Business is now pending review.');
    //         setBusiness(data.data);
    //         props.next?.();
    //         return;
    //     }
    // }, [business, props, setBusiness, updateBusinessRequest]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handlePrev = useCallback(async () => {
        props.prev?.();
    }, [props]);

    useMount(() => {
        console.log('user', user);
    });

    return (
        <div className="gap-4 flex flex-col">
            <div>
                <h3 className="m-0 text-center">Almost there!</h3>
                <p className="m-0 text-md text-center">
                    Please provide necessary files for us to verify your your business and identity.
                </p>
            </div>

            <div className="gap-2 flex flex-row">
                {user.is_business_registered && (
                    <div className="flex-1">
                        <span className="text-md">Business Registration</span>
                        <Dragger {...businessRegistrationProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">You can upload an image or file.</p>
                        </Dragger>
                    </div>
                )}

                <div className="flex-1">
                    <span className="text-md">Government ID</span>

                    <Dragger {...businessRegistrationProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">You can upload an image or file.</p>
                    </Dragger>
                </div>
            </div>
            <div className="mt-16">
                <p className="m-0 text-right">
                    By creating a worker account, you agree with our{' '}
                    <span className="font-semibold cursor-pointer" onClick={showModal}>
                        Terms & Conditions
                    </span>{' '}
                    for Creative Workers.
                </p>
            </div>
            <Modal
                title="Terms and Conditions"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
                cancelText={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <div className="flex flex-row-reverse gap-2">
                <Button type="primary" disabled={updateBusinessLoading} loading={updateBusinessLoading}>
                    Finish Registration
                </Button>
                <Button onClick={handlePrev}>Previous Step</Button>
            </div>
        </div>
    );
};

export default CreativeVerification;
