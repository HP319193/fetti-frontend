import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Input, TextArea } from 'components/basic';
import useApi from 'hooks/useApi';
import { createBusiness, updateBusiness } from 'services/message.service';
import { Form, message } from 'antd';
import { AuthContext } from 'context/AuthContext';
import useMount from 'hooks/useMount';

const CreativeDetails = (props: any) => {
    const [form] = Form.useForm();
    const { user, business, setBusiness, isLoading } = useContext<any>(AuthContext);

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const {
        request: createBusinessRequest,
        loading: createBusinessLoading,
        result: createBusinessResult,
    } = useApi({
        api: createBusiness,
    });

    const {
        request: updateBusinessRequest,
        loading: updateBusinessLoading,
        result: updateBusinessResult,
    } = useApi({
        api: updateBusiness,
    });

    const error = () => {
        message.error('There was an error in your request. Please try again.');
    };

    useEffect(() => {
        if (business) {
            console.log(business);
            form.setFieldsValue({
                name: business?.attributes?.name,
                phone_number: business?.attributes?.phone_number,
                address: business?.attributes?.address,
            });
        }
    }, [business, form]);

    const onFinish = useCallback(
        async (values: any) => {
            setLoading(true);

            try {
                if (business) {
                    const res = await updateBusinessRequest({ id: business.id, body: { data: values } });

                    if (res.error) {
                        error();
                        return;
                    }

                    const data = res.data;
                    setBusiness(data.data);
                    props.next?.();
                    return;
                }

                values.users_permissions_users = [user.id];
                const res = await createBusinessRequest({ data: values });

                if (res.error) {
                    error();
                    return;
                }

                const data = res.data;
                setBusiness(data.data);
                props.next?.();
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        },
        [user, updateBusinessRequest, setBusiness, props, createBusinessRequest, business],
    );

    const onFinishFailed = (errorInfo: any) => {
        console.log(user);
        console.log('Failed:', errorInfo);
        message.error('Please check your form for errors.');
    };

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{
                name: business?.attributes?.name,
                phone_number: business?.attributes?.phone_number,
                address: business?.attributes?.address,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            colon={false}
        >
            <div className="flex flex-col">
                <div>
                    <div>
                        <h3 className="m-0 text-center">We are excited to see you here!</h3>
                        <p className="m-0 text-md text-center">Please provide your business details to get started.</p>
                    </div>
                    <div className="flex mt-8 gap-4">
                        <div className="flex-1">
                            <span className="font-semibold text-md">Business Name</span>
                            <span className="block mb-2">This will publicly be shown in our list of vendors.</span>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input your business name.' }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Juan Company Inc."
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    disabled={loading || isLoading}
                                />
                            </Form.Item>
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-md">Business Contact Number</span>
                            <span className="block mb-2">We will contact your business through this number.</span>
                            <Form.Item
                                name="phone_number"
                                rules={[{ required: true, message: 'Please input your business phone number.' }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="+639123456789"
                                    onChange={e => setPhone(e.target.value)}
                                    value={phone}
                                    disabled={loading || isLoading}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <span className="font-semibold text-md m-0">Business Address</span>
                        <span className="block mb-2">
                            You can fine-tune this later to have a more accurate address.
                        </span>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Please input your business address.' }]}
                        >
                            <TextArea
                                size="large"
                                placeholder="#123, Brgy. Juanito, San Juan, San Juan City"
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                disabled={loading || isLoading}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse">
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={loading || createBusinessLoading || updateBusinessLoading || isLoading}
                    loading={loading || createBusinessLoading || updateBusinessLoading || isLoading}
                >
                    Next Step
                </Button>
            </div>
        </Form>
    );
};

export default CreativeDetails;
