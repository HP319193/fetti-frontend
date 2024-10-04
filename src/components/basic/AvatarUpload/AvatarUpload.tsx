import React, { useState } from 'react';
import { Popover, message } from 'antd';
import { Input, Button } from 'components';
import { AvatarUploadProps } from './AvatarUploadProps';
import { useAuth0 } from '@auth0/auth0-react';
import { UploadFile } from 'antd/es/upload';
import useMount from 'hooks/useMount';
import Upload, { RcFile } from 'antd/lib/upload';
import {
    CameraOutlined,
    CloseOutlined,
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

const AvatarUpload = (props: AvatarUploadProps) => {
    const { isLoading: accessTokenLoading, getAccessTokenSilently } = useAuth0();
    const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

    const [avatarOpen, setAvatarOpen] = useState(false);
    const [uploaderOpen, setUploaderOpen] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const checkAuth = async () => {
        const accessToken = await getAccessTokenSilently();
        setAccessToken(accessToken);
    };

    useMount(() => {
        checkAuth();
    });

    const hideAvatarPopup = () => {
        setAvatarOpen(false);
        setUploaderOpen(false);
    };

    const handleAvatarOpenChange = (newOpen: boolean) => {
        setAvatarOpen(newOpen);
        if (!newOpen) {
            setUploaderOpen(false);
        }
    };

    const showAvatarUploader = () => {
        setUploaderOpen(true);
    };

    const openAvatarUploader = () => () => {};

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file.');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('Image must be smaller than 1MB.');
        }
        return isJpgOrPng && isLt1M;
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setUploading(true);
            return;
        }
        setFileList([info.file]);
        setUploading(false);
        if (info.file.status === 'done') {
            message.success(`Avatar updated successfully.`);
            setAvatarOpen(false);
            if (props.onAvatarChange) {
                props.onAvatarChange(info.file.response.public_url);
            }
            if (props.onUploadFinish) {
                props.onUploadFinish();
            }
        }
    };

    return (
        <Popover
            content={
                <div className="flex items-center flex-col gap-4 p-2">
                    {uploaderOpen ? (
                        <Upload
                            accept="image/*"
                            listType="picture-card"
                            onChange={handleChange}
                            className="avatar-uploader"
                            beforeUpload={beforeUpload}
                            headers={{
                                Authorization: `Bearer ${accessToken}`,
                            }}
                            disabled={accessTokenLoading}
                            action={`${apiServerUrl}/admin/v1/${props.userType}s/${props.data.id}/avatar`}
                            showUploadList={false}
                            progress={{}}
                        >
                            <div className="w-full">
                                {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Select File</div>
                            </div>
                        </Upload>
                    ) : (
                        // <img
                        //     src={props.data.avatar_url}
                        //     className="w-full h-full rounded max-h-48 max-w-48"
                        // />
                        <ImageWithFallback
                            src={props.data.avatar_url}
                            firstName={props.data.first_name}
                            lastName={props.data.last_name}
                            imgStyle={{
                                width: '55px',
                                height: '55px',
                                borderRadius: '50%',
                                marginRight: '0',
                                fontSize: '20px',
                            }}
                            className="border border-4  border-gray-200 border-solid rounded-full"
                        />
                    )}

                    <div className="flex gap-2">
                        <Button onClick={hideAvatarPopup}>
                            <CloseOutlined />
                        </Button>
                        {!uploaderOpen && (
                            <Button type="primary" onClick={() => showAvatarUploader()}>
                                New Photo
                            </Button>
                        )}
                    </div>
                </div>
            }
            trigger="click"
            open={avatarOpen}
            onOpenChange={handleAvatarOpenChange}
        >
            <div
                className="rounded-full w-12 h-12 relative"
                onClick={openAvatarUploader()}
            >
                {/* <img src={props.data.avatar_url} className="rounded-full w-12 h-12" /> */}
                <ImageWithFallback
                    src={props.data.avatar_url}
                    firstName={props.data.first_name}
                    lastName={props.data.last_name}
                    containerStyle={{ width: 'inherit', height: 'inherit' }}
                    imgStyle={{ width: 'inherit', height: 'inherit' }}
                />
                <div
                    className="border border-4 w-12 h-12 inline-block top-0 left-0 rounded-full 
        cursor-pointer absolute border-gray-200 border-solid"
                ></div>

                <div
                    className="absolute bottom-0 right-0 bg-gray-200 rounded-full w-4 h-4 flex flex-col"
                    style={{ paddingTop: '1px' }}
                >
                    <CameraOutlined />
                </div>
            </div>
        </Popover>
    );
};

export default AvatarUpload;
