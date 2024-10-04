import React, { FunctionComponent, useCallback, useContext, useState } from 'react';
import useMount from 'hooks/useMount';
import { DashboardLayout } from 'components/layouts';
import { CalendarOutlined } from '@ant-design/icons';
import classnames from 'clsx';
import { Avatar, Button, Divider, Form, Select, message, Input } from 'antd';
import CreativePage from './CreativePage';
import { AuthContext } from 'context/AuthContext';
import useApi from 'hooks/useApi';
import { updateUser } from 'services/message.service';
import { Option } from 'antd/lib/mentions';
import { getToken, switchToEventPlanner } from 'helpers';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import AvatarUpload from './AvatarUpload';

const CreativeProfilePage = (props: any) => {
    const navigate = useNavigate();
    const { user, setUser, isLoading, fetchUser } = useContext<any>(AuthContext);
    const [isAvatarEditable, setIsAvatarEditable] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [isBusinessNameEditable, setIsBusinessNameEditable] = useState(false);
    const [isBusinessAddressEditable, setIsBusinessAddressEditable] = useState(false);
    const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);
    const [isDownpaymentEditable, setIsDownpaymentEditable] = useState(false);
    const [isCancellationEditable, setIsCancellationEditable] = useState(false);
    const [isCancellationFeeEditable, setIsCancellationFeeEditable] = useState(false);

    const [isFirstSectionEditable, setIsFirstSectionEditable] = useState(false);
    const [isSecondSectionEditable, setIsSecondSectionEditable] = useState(false);

    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');

    const [phoneForm] = Form.useForm();
    const [businessNameForm] = Form.useForm();
    const [locationLat, setLocationLat] = useState(0);
    const [locationLng, setLocationLng] = useState(0);
    const [loading, setLoading] = useState(false);

    const [downpayment, setDownpayment] = useState(0);
    const [paymentType, setPaymentType] = useState('downpayment');
    const [cancellation, setCancellation] = useState('');
    const [cancellationFee, setCancellationFee] = useState(0);

    useMount(() => {
        console.log('mounted creative profile page');
        if (!getToken() && !isLoading) {
            switchToEventPlanner();
        }

        if (user) {
            setAvatar(user.avatar_url);
            setPhoneNumber(user.phone_number);
            setBusinessName(user.business_name);
            setBusinessAddress(user.business_address);
            setDownpayment(user.downpayment || '20');
            setCancellation(user.cancellation || 'no_cancellation_a_day_prior');
            setCancellationFee(user.cancellation_fee || '50');
        }
    });

    const {
        request: updateBusinessNameRequest,
        loading: updateBusinessNameLoading,
        result: updateBusinessNameResult,
    } = useApi({
        api: updateUser,
    });

    const onFirstSectionSave = useCallback(
        async (values: any) => {
            console.log(values);
            try {
                const res = await updateBusinessNameRequest({
                    id: user?.id,
                    body: {
                        avatar_url: avatar,
                        phone_number: phoneNumber,
                        business_name: businessName,
                        business_address: businessAddress,
                        business_coordinates: {
                            lat: locationLat,
                            lng: locationLng,
                        },
                    },
                });
                console.log(res);

                if (res.error) {
                    message.error('There was an error in your request. Please try again.');
                    return;
                }
                setUser(res.data);
                setIsFirstSectionEditable(false);
                message.success('Details updated successfully.');
            } catch (e) {
                console.error(e);
            }
        },
        [
            user,
            updateBusinessNameRequest,
            setUser,
            avatar,
            phoneNumber,
            businessName,
            businessAddress,
            locationLat,
            locationLng,
        ],
    );

    const onFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please check your form for errors.');
    };

    const prefixSelector = (
        <Form.Item name="phone_prefix" noStyle initialValue={'63'}>
            <Select style={{ width: 70 }}>
                <Option value="63">+63</Option>
            </Select>
        </Form.Item>
    );

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
        // setIsBusinessAddressError(false);
        setLocationLat(placeDetails.geometry.location.lat());
        setLocationLng(placeDetails.geometry.location.lng());
        setLoading(false);
    };

    const {
        request: updateBusinessLocationRequest,
        loading: updateBusinessLocationLoading,
        result: updateBusinessLocationResult,
    } = useApi({
        api: updateUser,
    });

    const onBusinessLocationSave = useCallback(async () => {
        try {
            const res = await updateBusinessLocationRequest({
                id: user?.id,
                body: {
                    business_address: businessAddress,
                    business_coordinates: {
                        lat: locationLat,
                        lng: locationLng,
                    },
                },
            });

            if (res.error) {
                message.error('There was an error in your request. Please try again.');
                return;
            }

            fetchUser();
            message.success('Business location updated successfully.');
            setIsBusinessAddressEditable(false);
        } catch (err) {
            console.error(err);
            message.error('There was an error in your request. Please try again.');
        }
    }, [
        businessAddress,
        locationLat,
        locationLng,
        updateBusinessLocationRequest,
        user,
        fetchUser,
        setIsBusinessAddressEditable,
    ]);

    const {
        request: updateBusinessSettings,
        loading: updateBusinessSettingsLoading,
        result: updateBusinessSettingsResult,
    } = useApi({
        api: updateUser,
    });

    const onBusinessSettingsSave = useCallback(async () => {
        try {
            const res = await updateBusinessSettings({
                id: user?.id,
                body: {
                    paymentType,
                    downpayment,
                    cancellation,
                    cancellation_fee: cancellationFee,
                },
            });

            if (res.error) {
                message.error('There was an error in your request. Please try again.');
                return;
            }

            fetchUser();
            message.success('Business settings updated successfully.');
            setIsDownpaymentEditable(false);
            setIsCancellationEditable(false);
            setIsCancellationFeeEditable(false);
        } catch (err) {
            console.error(err);
            message.error('There was an error in your request. Please try again.');
        }
    }, [
        downpayment,
        cancellation,
        cancellationFee,
        updateBusinessSettings,
        paymentType,
        user,
        fetchUser,
        setIsDownpaymentEditable,
        setIsCancellationEditable,
        setIsCancellationFeeEditable,
    ]);

    return (
        <CreativePage>
            <Form
                form={businessNameForm}
                name="basic"
                layout="vertical"
                onFinish={onFirstSectionSave}
                onFinishFailed={onFailed}
                autoComplete="off"
                colon={false}
                className="w-full"
            >
                <div className="flex items-center mb-4">
                    <div className="flex-1">
                        <h2 className="m-0 font-bold" style={{ letterSpacing: '-1px' }}>
                            my profile
                        </h2>
                    </div>

                    <div>
                        {isFirstSectionEditable ? (
                            <div className="flex gap-1">
                                <Button
                                    size="small"
                                    type="default"
                                    onClick={() => {
                                        setIsFirstSectionEditable(false);
                                    }}
                                    disabled={updateBusinessNameLoading}
                                >
                                    <span className="font-semibold">cancel</span>
                                </Button>
                                <Button
                                    size="small"
                                    htmlType="submit"
                                    type="primary"
                                    disabled={updateBusinessNameLoading}
                                    loading={updateBusinessNameLoading}
                                >
                                    <span className="font-semibold">save</span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="small"
                                type="text"
                                onClick={() => {
                                    setIsFirstSectionEditable(true);
                                }}
                            >
                                <span className="font-semibold">edit</span>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center creative-page" id="profile-page">
                    <div className="flex flex-1 flex-col gap-1 items-start">
                        {isFirstSectionEditable ? (
                            <AvatarUpload
                                setAvatar={(a: string) => {
                                    setAvatar(a);
                                }}
                            />
                        ) : (
                            <>
                                <p className="font-semibold m-0 text-sm">profile photo</p>
                                <Avatar shape="circle" size={80} icon={<UserOutlined />} src={user?.avatar_url} />
                            </>
                        )}
                    </div>
                </div>

                <Divider dashed />

                <div className="flex flex-1 flex-col gap-1 items-start">
                    <p className="font-semibold m-0 text-sm">email</p>
                    <p className="m-0 text-md">{user?.email}</p>
                </div>

                <Divider dashed />

                <div className="flex flex-1 flex-col gap-1 items-start">
                    <p className="font-semibold m-0 text-sm">registered with DTI/SEC business</p>
                    <p className="m-0 text-md">{user?.is_business_registered ? 'Yes' : 'No'}</p>
                </div>

                <Divider dashed />

                {user?.is_business_registered && (
                    <>
                        <div className="flex items-center">
                            <div className="flex flex-1 flex-col gap-1 items-start">
                                <p className="font-semibold m-0 text-sm">business name</p>
                                {isFirstSectionEditable && (
                                    <Form.Item
                                        name="business_name"
                                        className="w-full"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your business name.',
                                            },
                                        ]}
                                    >
                                        <div className="flex flex-1 flex-row gap-2 items-center w-full">
                                            <Input
                                                size="large"
                                                className="rounded-md w-full"
                                                placeholder="Juan dela Bakeshop"
                                                onChange={e => setBusinessName(e.target.value)}
                                                value={businessName}
                                            />
                                        </div>
                                    </Form.Item>
                                )}
                            </div>
                        </div>

                        <Divider dashed />
                    </>
                )}

                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-1 items-start">
                        <p className="font-semibold m-0 text-sm">location</p>
                        {isFirstSectionEditable ? (
                            <div className="flex flex-1 flex-row gap-2 items-center w-full">
                                <div className="flex flex-col gap-2 items-start w-full">
                                    {!businessAddress && (
                                        <Input.Search
                                            placeholder="search for your location..."
                                            loading={isPlacePredictionsLoading}
                                            size="large"
                                            onPressEnter={(e: any) => {
                                                if (e.target.value) {
                                                    getSearchOptions(e.target.value);
                                                }
                                                e.preventDefault();
                                            }}
                                            onSearch={(value: string) => {
                                                if (value) {
                                                    getSearchOptions(value);
                                                }
                                            }}
                                        />
                                    )}

                                    {placePredictions.length > 0 && !businessAddress && (
                                        <div className="rounded mt-2">
                                            {placePredictions.map((place: any) => {
                                                return (
                                                    <div
                                                        className="cursor-pointer text-sm hover:bg-slate-50 rounded p-2"
                                                        onClick={() => {
                                                            console.log(place);
                                                            handleAddressClicked(place.description, place.place_id);
                                                        }}
                                                    >
                                                        {place.description}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {businessAddress && (
                                        <div className="flex items-center gap-4 rounded mt-2">
                                            <p className="m-0 text-md">{businessAddress}</p>
                                            <Button
                                                type="ghost"
                                                size="small"
                                                onClick={() => {
                                                    setBusinessAddress('');
                                                    setLocationLat(0);
                                                    setLocationLng(0);
                                                }}
                                            >
                                                pick a different location
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-row gap-2 items-center w-full">
                                <p className="m-0 text-md w-full">{user?.business_address}</p>
                            </div>
                        )}
                    </div>
                </div>

                <Divider dashed />

                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-1 items-start">
                        <p className="font-semibold m-0 text-sm">phone number</p>
                        {isFirstSectionEditable ? (
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
                                className="w-full"
                                initialValue={phoneNumber}
                            >
                                <div className="flex flex-1 flex-row gap-2 items-center w-full">
                                    <Input
                                        size="large"
                                        className="rounded-md w-full"
                                        addonBefore={prefixSelector}
                                        placeholder="9178199119"
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                        defaultValue={user?.phone_number}
                                    />
                                </div>
                            </Form.Item>
                        ) : (
                            <div className="flex flex-1 flex-row gap-2 items-center w-full">
                                <p className="m-0 text-md w-full">
                                    +{user?.phone_prefix}
                                    {user?.phone_number}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Form>

            <div className="flex items-center mt-16">
                <div className="flex flex-1">
                    <h2 className="mb-2 font-bold" style={{ letterSpacing: '-1px' }}>
                        payment terms
                    </h2>
                </div>
                <div className="flex gap-1">
                    <div>
                        {isSecondSectionEditable ? (
                            <div className="flex gap-1">
                                <Button
                                    size="small"
                                    type="default"
                                    onClick={() => {
                                        setIsSecondSectionEditable(false);
                                    }}
                                    disabled={updateBusinessSettingsLoading}
                                >
                                    <span className="font-semibold">cancel</span>
                                </Button>
                                <Button
                                    size="small"
                                    type="primary"
                                    onClick={onBusinessSettingsSave}
                                    disabled={updateBusinessSettingsLoading}
                                    loading={updateBusinessSettingsLoading}
                                >
                                    <span className="font-semibold">save</span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="small"
                                type="text"
                                onClick={() => {
                                    setIsSecondSectionEditable(true);
                                }}
                            >
                                <span className="font-semibold">edit</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-8 rounded" style={{ background: '#FAFAFA' }}>
                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-2 items-start">
                        <p className="font-semibold m-0 text-md">payment type</p>
                        <div className="flex flex-1">
                            <p className="m-0 text-md">
                                {isSecondSectionEditable ? (
                                    <Select
                                        size="large"
                                        value={paymentType}
                                        style={{ width: 120 }}
                                        onChange={setPaymentType}
                                    >
                                        <Option value="downpayment">downpayment</Option>
                                        <Option value="full payment">full payment</Option>
                                    </Select>
                                ) : (
                                    paymentType
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <Divider dashed />

                {paymentType == 'downpayment' && (
                    <>
                        <div className="flex items-center">
                            <div className="flex flex-1 flex-col gap-2 items-start">
                                <p className="font-semibold m-0 text-md">downpayment</p>
                                <p className="m-0 text-md">
                                    Non-negotiable at{'  '}
                                    {isSecondSectionEditable ? (
                                        <Select
                                            size="large"
                                            value={downpayment}
                                            style={{ width: 120 }}
                                            onChange={setDownpayment}
                                        >
                                            <Option value="10">10%</Option>
                                            <Option value="20">20%</Option>
                                            <Option value="30">30%</Option>
                                            <Option value="40">40%</Option>
                                            <Option value="50">50%</Option>
                                        </Select>
                                    ) : (
                                        downpayment + '%'
                                    )}
                                </p>
                            </div>
                        </div>

                        <Divider dashed />
                    </>
                )}

                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-2 items-start">
                        <p className="font-semibold m-0 text-md">cancellation</p>
                        <p className="m-0 text-md">
                            {isSecondSectionEditable ? (
                                <Select
                                    size="large"
                                    defaultValue="no_cancellation_a_day_prior"
                                    value={cancellation}
                                    onChange={setCancellation}
                                >
                                    <Option value="within_24_hours">Within 24 hours</Option>
                                    <Option value="no_cancellation_a_day_prior">No cancellation a day prior</Option>
                                    <Option value="no_cancellation_a_week_prior">No cancellation a week prior</Option>
                                </Select>
                            ) : cancellation == 'no_cancellation_a_day_prior' ? (
                                'No cancellation a day prior'
                            ) : cancellation == 'within_24_hours' ? (
                                'Within 24 hours'
                            ) : (
                                'No cancellation a week prior'
                            )}
                        </p>
                    </div>
                </div>

                <Divider dashed />

                <div className="flex items-center">
                    <div className="flex flex-1 flex-col gap-2 items-start">
                        <p className="font-semibold m-0 text-md">cancellation fee</p>
                        <p className="m-0 text-md">
                            {isSecondSectionEditable ? (
                                <Select size="large" value={cancellationFee} onChange={setCancellationFee}>
                                    <Option value="0">0%</Option>
                                    <Option value="10">10%</Option>
                                    <Option value="20">20%</Option>
                                    <Option value="30">30%</Option>
                                    <Option value="40">40%</Option>
                                    <Option value="50">50%</Option>
                                </Select>
                            ) : (
                                cancellationFee + '%'
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4"></div>
        </CreativePage>
    );
};

export default CreativeProfilePage;
