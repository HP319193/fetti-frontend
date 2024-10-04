import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from 'components/layouts';
import useApi from 'hooks/useApi';
import { getServices, updateUser } from 'services/message.service';
import { AuthContext } from 'context/AuthContext';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadProps } from 'antd/es/upload';
import { getToken } from 'helpers';
import { InboxOutlined } from '@ant-design/icons';
import AvatarUpload from './AvatarUpload';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useMount from 'hooks/useMount';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const RegistrationDocsPage = () => {
    const navigate = useNavigate();
    const { user, setUser, fetchUser } = useContext<any>(AuthContext);
    const [businessRegistrationLoading, setBusinessRegistrationLoading] = useState(false);
    const [governmentIdLoading, setGovernmentIdLoading] = useState(false);

    const [businessRegistrationDoc, setBusinessRegistrationDoc] = useState<string>('');
    const [governmentIdDoc, setGovernmentIdDoc] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const role = localStorage.getItem('role') || 'event-planner';

    const {
        request: updateUserRequest,
        loading: updateUserLoading,
        result: updateUserResult,
    } = useApi({
        api: updateUser,
    });

    const handleNext = useCallback(async () => {
        const res = await updateUserRequest({
            id: user.id,
            body: {
                government_id: governmentIdDoc,
                business_registration: businessRegistrationDoc,
                avatar_url: avatar,
            },
        });

        if (res.error) {
            console.log(res.error);
            message.error(res.error.message);
            return;
        }

        const data = res.data;
        console.log(data);
        fetchUser();
        navigate('/registered');
    }, [navigate, updateUserRequest, user, avatar, businessRegistrationDoc, governmentIdDoc, fetchUser]);

    const handleSkip = useCallback(() => {
        navigate('/registered');
    }, [navigate]);

    const beforeUpload = (file: RcFile) => {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // if (!isJpgOrPng) {
        //     message.error('You can only upload JPG/PNG file.');
        // }
        const isLt2M = file.size / 1024 / 1024 < 15;
        if (!isLt2M) {
            message.error('File must smaller than 15MB.');
        }
        return isLt2M;
    };

    const handleBusinessRegistrationChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setBusinessRegistrationLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            console.log(info);
            const file = info.file.response?.[0];
            console.log(file);
            const url = file.url;
            setBusinessRegistrationDoc(url);
            setBusinessRegistrationLoading(false);
            message.success(`${info.file.name} file uploaded successfully.`);
        }
    };

    const handleGovernmentIdChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setGovernmentIdLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            console.log(info);
            const file = info.file.response?.[0];
            console.log(file);
            const url = file.url;
            setGovernmentIdDoc(url);
            setGovernmentIdLoading(false);
            message.success(`${info.file.name} file uploaded successfully.`);
        }
    };

    const governmentIdButton = (
        <div>
            {governmentIdLoading ? (
                <LoadingOutlined />
            ) : governmentIdDoc ? (
                <div>
                    <CheckCircleOutlined className="text-md text-fetti-pink" />
                    <p className="m-0 font-semibold">Document Uploaded</p>
                </div>
            ) : (
                <PlusOutlined />
            )}
            <div style={{ zIndex: 99999 }}>{governmentIdDoc ? 'Click to choose a different file' : 'Upload File'}</div>
        </div>
    );

    const businessRegistrationButton = (
        <div>
            {businessRegistrationLoading ? (
                <LoadingOutlined />
            ) : businessRegistrationDoc ? (
                <div>
                    <CheckCircleOutlined className="text-md text-fetti-pink" />
                    <p className="m-0 font-semibold">Document Uploaded</p>
                </div>
            ) : (
                <PlusOutlined />
            )}
            <div style={{ zIndex: 99999 }}>{businessRegistrationDoc ? 'Choose A Different File' : 'Upload File'}</div>
        </div>
    );

    return (
        <div className="flex flex-col w-full gap-4 px-40 py-8" id="registration-docs-page">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-2xl m-0" style={{ letterSpacing: '-1px' }}>
                    you're&nbsp;
                    <span className="font-bold text-fetti">almost there.</span>
                </h1>
                <p className="text-md">Just needing a confetti (sprinkle, get it?) of information.</p>
            </div>

            <div className="flex flex-col items-center gap-1 avatar-circle">
                <div>
                    <AvatarUpload
                        setAvatar={(a: string) => {
                            setAvatar(a);
                        }}
                    />
                </div>
                <p className="text-md text-center m-0">{user.first_name + ' ' + user.last_name.charAt(0) + '.'}</p>
                <p className="text-sm text-center m-0 italic">*Upload your photo</p>
            </div>

            <div className="flex flex-row w-full py-8 gap-8 docs-upload">
                {user?.is_business_registered && (
                    <div className="flex-1">
                        <span className="text-md">Business Registration</span>

                        <Upload
                            name="files"
                            listType="picture-card"
                            showUploadList={false}
                            action={`${apiServerUrl}/api/upload`}
                            beforeUpload={beforeUpload}
                            onChange={handleBusinessRegistrationChange}
                            accept="image/png, image/jpeg"
                        >
                            {businessRegistrationButton}
                        </Upload>
                    </div>
                )}
                <div className="flex-1">
                    <Upload
                        name="files"
                        listType="picture-card"
                        showUploadList={false}
                        action={`${apiServerUrl}/api/upload`}
                        beforeUpload={beforeUpload}
                        onChange={handleGovernmentIdChange}
                        accept="image/png, image/jpeg"
                    >
                        <div className="flex flex-col items-center gap-2 w-full p-12">
                            {!governmentIdDoc && (
                                <span className="text-sm">Government ID (for verification purposes)</span>
                            )}
                            {governmentIdButton}
                        </div>
                    </Upload>
                </div>
            </div>

            <div className="flex flex-row-reverse gap-2 w-full mb-8">
                <Button type="primary" onClick={handleNext} disabled={updateUserLoading} loading={updateUserLoading}>
                    save
                </Button>
                <Button onClick={handleSkip} disabled={updateUserLoading} loading={updateUserLoading}>
                    skip
                </Button>
            </div>
        </div>
    );
};

export default RegistrationDocsPage;
