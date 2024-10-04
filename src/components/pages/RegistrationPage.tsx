import React, { FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Form, Input, Select, Spin, Switch, Tooltip, message } from 'antd';
import classnames from 'clsx';
import { Text, TextArea } from 'components/basic';
import { useNavigate } from 'react-router-dom';
import VendorLayout from './Vendor/VendorLayout';
import useMount from 'hooks/useMount';
import { DashboardLayout } from 'components/layouts';
import useApi from 'hooks/useApi';
import { updateUser } from 'services/message.service';
import { AuthContext } from 'context/AuthContext';
import { register } from 'serviceWorker';
import { Option } from 'antd/lib/mentions';
import { CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Search from 'antd/lib/input/Search';
import { debounce } from 'lodash';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user, setUser, isLoading } = useContext<any>(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [purpose, setPurpose] = useState('');
    const [isBusinessRegistered, setIsBusinessRegistered] = useState(false);

    const [locationLat, setLocationLat] = useState(0);
    const [locationLng, setLocationLng] = useState(0);
    const [loading, setLoading] = useState(false);

    const role = localStorage.getItem('role') ?? 'creative-worker';
    const [isBusinessAddressError, setIsBusinessAddressError] = useState(false);

    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const {
        request: updateUserRequest,
        loading: updateUserLoading,
        result: updateUserResult,
    } = useApi({
        api: updateUser,
    });

    useMount(() => {
        console.log('registration page mounted');
        localStorage.setItem('role', 'creative-worker');

        if (user && !isLoading) {
            console.log('user', user);

            if (role == 'event-planner' && isEventPlannerAccountReady()) {
                navigate('/');
                return;
            } else if (
                (role == 'creative-worker' && isCreativeAccountReady()) ||
                (isCreativeAccountReady() && !isCreativeServicesReady())
            ) {
                navigate('/register/services');
                return;
            } else if (role == 'creative-worker' && isCreativeServicesReady()) {
                navigate('/register/docs');
                return;
            } else {
                form.setFieldsValue({
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    phone_number: user?.phone_number,
                });
            }
        }
    });

    const prefixSelector = (
        <Form.Item name="phone_prefix" noStyle initialValue={'63'}>
            <Select style={{ width: 70 }}>
                <Option value="63">+63</Option>
            </Select>
        </Form.Item>
    );

    const isEventPlannerAccountReady = () => {
        return user?.first_name && user?.last_name && user?.phone_number;
    };

    const isCreativeAccountReady = () => {
        return (
            user?.first_name &&
            user?.last_name &&
            user?.phone_number &&
            user?.business_name &&
            ((user?.is_business_registered && user?.business_address) || !user?.is_business_registered)
        );
    };

    const isCreativeServicesReady = () => {
        return user?.services?.length;
    };

    const getSearchOptions = useCallback(
        async (searchText: string) => {
            getPlacePredictions({ input: searchText });
        },
        [getPlacePredictions],
    );

    const handleAddressClicked = useCallback(
        (businessAddress: string, placeId: string) => {
            setLoading(true);
            placesService?.getDetails(
                {
                    placeId: placeId,
                },
                (placeDetails: any) => saveSelectedLocation(businessAddress, placeDetails),
            );
        },
        [placesService],
    );

    const saveSelectedLocation = (businessAddress: string, placeDetails: any) => {
        setBusinessAddress(businessAddress);
        setIsBusinessAddressError(false);
        setLocationLat(placeDetails.geometry.location.lat());
        setLocationLng(placeDetails.geometry.location.lng());
        setLoading(false);
    };

    const onFinish = useCallback(
        async (values: any) => {
            console.log(values);

            // if (!businessAddress) {
            //     setIsBusinessAddressError(true);
            //     return;
            // }

            values.is_business_registered = isBusinessRegistered;
            // values.business_address = businessAddress;
            values.business_coordinates = {
                lat: locationLat,
                lng: locationLng,
            };

            if (!isBusinessRegistered) {
                values.business_name = user?.first_name + ' ' + user?.last_name;
            }

            try {
                const res = await updateUserRequest({ id: user?.id, body: values });
                console.log(res);

                if (res.error) {
                    message.error('There was an error in your request. Please try again.');
                    return;
                }

                setUser(res.data);
                if (role == 'creative-worker') {
                    navigate('/register/services');
                } else {
                    navigate('/registered');
                }
            } catch (e) {
                console.error(e);
            }
        },
        [updateUserRequest, navigate, user, setUser, role, isBusinessRegistered, locationLat, locationLng],
    );

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please check your form for errors.');
        if (!businessAddress) {
            setIsBusinessAddressError(true);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row w-full">
            <div className="bg-fetti-gradient hidden md:block" style={{ width: '50%' }}></div>

            <div className="flex items-center flex-1 pl-16 pr-16 items-center overflow-y-auto">
                <div className="flex flex-col gap-4 w-full h-full pt-10 pb-16">
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        colon={false}
                        className="w-full"
                    >
                        <div className="flex flex-col items-center">
                            <h1
                                className="m-0 text-center ttnorms-bold"
                                style={{ letterSpacing: '-1px', fontSize: '28px' }}
                            >
                                complete your <span className="text-fetti ttnorms-bold">account registration</span>.
                            </h1>
                            <p className="mb-8 text-xs">
                                Please provide additional details to finish your registration.
                            </p>
                        </div>
                        <div
                            className="flex flex-col items-center rounded-lg py-4 px-8"
                            style={{ backgroundColor: '#FAFAFA' }}
                        >
                            {(role == 'event-planner' ||
                                (role == 'creative-worker' && (!user?.first_name || !user?.last_name))) && (
                                <div className="flex items-start w-full text-left">
                                    <div className="flex flex-1 gap-4">
                                        <div className="flex-1 items-start flex flex-col">
                                            <span className="font-semibold text-xs">first name</span>
                                            <Form.Item
                                                name="first_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your first name.',
                                                    },
                                                ]}
                                                className="w-full"
                                            >
                                                <Input
                                                    size="large"
                                                    placeholder="Juan"
                                                    onChange={e => setFirstName(e.target.value)}
                                                    value={firstName}
                                                    // disabled={loading || isLoading}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="flex-1 items-start flex flex-col">
                                            <span className="font-semibold">last name</span>
                                            <Form.Item
                                                name="last_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your last name.',
                                                    },
                                                ]}
                                                className="w-full"
                                            >
                                                <Input
                                                    size="large"
                                                    placeholder="Dela Cruz"
                                                    onChange={e => setLastName(e.target.value)}
                                                    value={lastName}
                                                    // disabled={loading || isLoading}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(role == 'event-planner' || (role == 'creative-worker' && !user?.phone_number)) && (
                                <div className="flex-1 items-start flex flex-col text-left w-full">
                                    <span className="font-semibold">phone number</span>
                                    <Form.Item
                                        name="phone_number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone number.',
                                            },
                                            {
                                                min: 10,
                                                max: 10,
                                                message: 'Please enter 10 digits.',
                                            },
                                            {
                                                pattern: /^[0-9]*$/,
                                                message: 'Please enter a valid phone number.',
                                            },
                                        ]}
                                        className="w-full p-4"
                                    >
                                        <Input
                                            addonBefore={prefixSelector}
                                            size="large"
                                            placeholder="9178199119"
                                            onChange={e => setPhoneNumber(e.target.value)}
                                            value={phoneNumber}
                                            // disabled={loading || isLoading}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                        </div>

                        <p className="m-0 mt-6 font-semibold">select what applies to you</p>
                        <div
                            className="flex flex-col items-start rounded-lg py-6 px-9 bg-slate-100 mt-2"
                            style={{ backgroundColor: '#FAFAFA' }}
                        >
                            {role == 'creative-worker' ? (
                                <>
                                    <div className="flex-1 items-start grid grid-cols-2 flex-row text-left w-full gap-8">
                                        <div
                                            className="flex-1 bordered border border-slate-50 border-solid rounded text-center transition cursor-pointer bg-white hover:shadow-md p-6 h-full"
                                            onClick={() => setIsBusinessRegistered(true)}
                                            style={{ borderColor: isBusinessRegistered ? '#e8107c' : '#b7b7b7' }}
                                        >
                                            <span className="font-bold">DTI/SEC Registered Business</span>
                                            <br />
                                            (I can provide receipts)
                                        </div>
                                        <div
                                            className="flex-1 bordered border border-slate-50 border-solid rounded text-center transition cursor-pointer bg-white hover:shadow-md p-6 h-full align-middle justify-center"
                                            onClick={() => setIsBusinessRegistered(false)}
                                            style={{ borderColor: !isBusinessRegistered ? '#e8107c' : '#b7b7b7' }}
                                        >
                                            <span className="font-bold">Freelancer</span>
                                            <br />
                                            (I'm a newcomer)
                                        </div>
                                    </div>

                                    <div className="flex-1 items-start flex flex-col text-left w-full mt-4">
                                        <span className="font-semibold">
                                            {isBusinessRegistered ? 'registered DTI/SEC business name' : 'brand name'}
                                        </span>
                                        <Form.Item
                                            name="business_name"
                                            className="w-full p-0"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: isBusinessRegistered
                                                        ? 'Please input your business name.'
                                                        : 'Please input your brand name',
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="juan's bakeshop"
                                                onChange={e => setBusinessName(e.target.value)}
                                                value={businessName}
                                                // disabled={loading || isLoading}
                                            />
                                        </Form.Item>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 items-start flex flex-col text-left">
                                    <span className="font-semibold">what best describes what you are looking for?</span>
                                    <Form.Item name="purpose" className="w-full">
                                        <Input
                                            size="large"
                                            placeholder="looking for wedding suppliers, etc."
                                            onChange={e => setPurpose(e.target.value)}
                                            value={purpose}
                                            // disabled={loading || isLoading}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                        </div>

                        <p className="m-0 text-right text-xs mt-4">
                            By signing up, you agree with our{' '}
                            <span className="font-semibold cursor-pointer">Terms & Conditions</span>.
                        </p>

                        <div className="flex flex-row-reverse mt-2 mb-16">
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={updateUserLoading}
                                loading={updateUserLoading}
                            >
                                {role == 'event-planner' ? 'finish registration' : 'continue'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
