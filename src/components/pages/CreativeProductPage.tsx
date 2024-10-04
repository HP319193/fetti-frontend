import React, { useCallback, useContext, useMemo } from 'react';
import classnames from 'clsx';
import { Button, Divider, Form, Input, Skeleton, Switch, message } from 'antd';
import CreativePage from './CreativePage';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from 'hooks/useApi';
import {
    createProduct,
    getAddOns,
    getCustomizations,
    getEventTypes,
    getProduct,
    getProductsByServiceId,
    getService,
    updateProduct,
} from 'services/message.service';
import useMount from 'hooks/useMount';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { Select } from 'components';
import { combineArrays } from 'helpers';
import Upload, { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { UploadProps } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined, LeftCircleOutlined, CloseOutlined, LeftCircleFilled } from '@ant-design/icons';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const CreativeProductPage = (props: any) => {
    const navigate = useNavigate();
    const { user, isLoading } = useContext<any>(AuthContext);
    const params = useParams();
    const [service, setService] = React.useState<any>({});
    const [customizations, setCustomizations] = React.useState<any[]>([]);
    const [addOns, setAddOns] = React.useState<any[]>([]);
    const [productImagesLoading, setProductImagesLoading] = React.useState(false);
    const [productImages, setProductImages] = React.useState<any[]>([]);
    const [product, setProduct] = React.useState<any>({});
    const [eventTypes, setEventTypes] = React.useState<any[]>([]);
    const [form] = Form.useForm();

    const { request, result, loading } = useApi({
        api: getService,
    });

    const {
        request: createProductRequest,
        result: createProductResult,
        loading: createProductLoading,
    } = useApi({
        api: createProduct,
    });

    const {
        request: updateProductRequest,
        result: updateProductResult,
        loading: updateProductLoading,
    } = useApi({
        api: updateProduct,
    });

    const {
        request: getProductRequest,
        result: productResult,
        loading: productLoading,
    } = useApi({
        api: getProduct,
    });

    const {
        request: getEventTypesRequest,
        result: eventTypesResult,
        loading: eventTypesLoading,
    } = useApi({
        api: getEventTypes,
    });

    useMount(() => {
        fetchService();
        fetchEventTypes();
        fetchCustomizations();
    });

    const fetchService = () => {
        request({ id: params?.serviceId })
            .then(result => {
                setService(result?.data?.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const fetchEventTypes = () => {
        getEventTypesRequest()
            .then(result => {
                setEventTypes(result?.data?.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const fetchProduct = (customizations: any) => {
        getProductRequest({ id: params?.productId })
            .then(result => {
                const product = result?.data?.data;
                setProduct(product);
                setProductImages(product.attributes.images);
                setAddOns(product.attributes.add_ons);

                // auto-select
                console.log('1', product.attributes.variants);
                const c = customizations.map((custom: any) => {
                    const selected =
                        product.attributes.variants?.filter((c1: any) => c1.id === custom.id && c1.selected).length > 0;

                    return {
                        ...custom,
                        selected: selected,
                    };
                });

                // add user-added customizations
                const others = product.attributes.variants?.filter((c1: any) => {
                    const added = customizations.filter((c2: any) => c2.id === c1.id).length > 0;
                    return !added;
                });

                // join others and c
                const newCustomizations = c.concat(others || []);
                console.log('newCustomizations', newCustomizations);
                setCustomizations(newCustomizations);

                form.setFieldsValue({
                    name: product.attributes.name,
                    base_price: product.attributes.base_price,
                    events: product.attributes.event_types?.data.map((e: any) => e.id),
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const {
        request: requestCustomizations,
        result: resultCustomizations,
        loading: loadingCustomizations,
    } = useApi({
        api: getCustomizations,
    });

    const fetchCustomizations = () => {
        requestCustomizations({ serviceId: params?.serviceId })
            .then(result => {
                const customizations = result?.data?.data.map((c: any) => {
                    return {
                        ...c,
                        disabled: true,
                    };
                });

                setCustomizations(customizations);

                if (params?.productId) {
                    fetchProduct(customizations);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const {
        request: requestAddOns,
        result: resultAddOns,
        loading: loadingAddOns,
    } = useApi({
        api: getAddOns,
    });

    const onCustomizationSelected = (customization: any) => {
        const modifiedCustomizations = customizations.map(c => {
            if (c.id === customization.id) {
                c.selected = !c.selected;
            }
            return c;
        });

        setCustomizations(modifiedCustomizations);
    };

    const handleCustomizationOptions = (options: any, customization: any) => {
        const modifiedCustomizations = customizations.map(c => {
            if (c.id === customization.id) {
                c.attributes.options = options;
            }
            return c;
        });

        setCustomizations(modifiedCustomizations);
    };

    // const customizationVariantCombinations = useMemo(() => {
    //     console.log('customizations', customizations);
    //     const options = customizations
    //         .filter(c => c.attributes.options && c.attributes.options.length > 0 && c.selected)
    //         .map(c => c.attributes.options);
    //     console.log('options', options);
    //     return combineArrays(options);
    // }, [customizations]);

    const handleCreateAddOn = useCallback(() => {
        const newAddOns = addOns.map(addOn => {
            return {
                ...addOn,
            };
        });

        newAddOns.push({});

        setAddOns(newAddOns);
    }, [setAddOns, addOns]);

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file.');
        }
        const isLt2M = file.size / 1024 / 1024 < 15;
        if (!isLt2M) {
            message.error('File must smaller than 15MB.');
        }
        return isLt2M;
    };

    const handleProductImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setProductImagesLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            console.log(info);
            const file = info.file.response?.[0];
            console.log(file);
            const url = file.url;
            message.success(`${info.file.name} image uploaded successfully.`);

            // add new image to list
            handleProductImageUploaded(url);
            setProductImagesLoading(false);
        }
    };

    const handleProductImageUploaded = useCallback(
        (url: string) => {
            let newProductImages = productImages.map(image => image);
            newProductImages.push({
                url,
            });

            setProductImages(newProductImages);
        },
        [productImages],
    );

    const handleRemoveProductImage = (index: number) => {
        const newProductImages = productImages.filter((image, i) => i !== index);
        setProductImages(newProductImages);
    };

    const uploadImageButton = (
        <div>
            {productImagesLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ zIndex: 99999 }}>Click here to browse files to upload</div>
        </div>
    );

    const checkMinimumPhotoCount = useCallback(() => {
        console.log(productImages);

        if (productImages.length < 6) {
            message.error('Please upload at least 6 product images.');
            return false;
        }

        return true;
    }, [productImages]);

    const handleCreateProduct = useCallback(
        async (values: any) => {
            console.log(values);

            if (!checkMinimumPhotoCount()) {
                return;
            }

            values.images = productImages;
            values.add_ons = addOns;
            values.variants = customizations.filter(c => c.selected);

            // convert to integer
            const serviceId = parseInt(params?.serviceId + '');
            values.service = {
                connect: [serviceId],
            };
            values.users_permissions_user = {
                connect: [user?.id],
            };
            values.approved = false;

            try {
                const res = await createProductRequest({ data: values });
                console.log(res);

                if (res.error) {
                    message.error('There was an error in your request. Please try again.');
                    return;
                }

                message.success('product created successfully.');
                navigate(`/creative/services/${params?.serviceId}`);
            } catch (e) {
                console.error(e);
            }
        },
        [
            navigate,
            user,
            addOns,
            createProductRequest,
            productImages,
            params?.serviceId,
            checkMinimumPhotoCount,
            customizations,
        ],
    );

    const handleUpdateProduct = useCallback(
        async (values: any) => {
            console.log(values);

            if (!checkMinimumPhotoCount()) {
                return;
            }

            values.images = productImages;
            values.add_ons = addOns;
            values.variants = customizations.filter(c => c.selected);
            values.event_types = {
                connect: values.events,
            };

            console.log(values);

            try {
                const res = await updateProductRequest({ id: params?.productId, body: { data: values } });
                console.log(res);

                if (res.error) {
                    message.error('There was an error in your request. Please try again.');
                    return;
                }

                message.success('product updated successfully.');
                navigate(`/creative/services/${params?.serviceId}`);
            } catch (e) {
                console.error(e);
            }
        },
        [
            navigate,
            updateProductRequest,
            addOns,
            productImages,
            params?.productId,
            params?.serviceId,
            checkMinimumPhotoCount,
            customizations,
        ],
    );

    const onFinish = useCallback(
        async (values: any) => {
            console.log('onfinish values: ', values);
            if (params?.productId) {
                handleUpdateProduct(values);
            } else {
                handleCreateProduct(values);
            }
        },
        [handleCreateProduct, handleUpdateProduct, params?.productId],
    );

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        checkMinimumPhotoCount();
        message.error('Please check your form for errors.');
    };

    const headerLabel = useMemo(() => {
        return params?.productId ? (
            <div className="flex flex-row items-center gap-2">
                <div>
                    <LeftCircleFilled
                        onClick={() => {
                            navigate(`/creative/services/${params?.serviceId}`);
                        }}
                        style={{ fontSize: '24px', marginTop: '6px' }}
                        className="cursor-pointer"
                    />
                </div>

                <h2 className="font-semibold m-0">edit product</h2>
            </div>
        ) : (
            <div className="flex flex-row items-center gap-2">
                <div>
                    <LeftCircleFilled
                        onClick={() => {
                            navigate(`/creative/services/${params?.serviceId}`);
                        }}
                        style={{ fontSize: '24px', marginTop: '6px' }}
                        className="cursor-pointer"
                    />
                </div>
                <h2 className="font-bold m-0" style={{ letterSpacing: '-1px' }}>
                    create new&nbsp;
                    <span className="text-fetti lowercase font-bold">{service?.attributes?.name}</span>
                    &nbsp;product / service.
                </h2>
            </div>
        );
    }, [service, params?.productId, navigate, params?.serviceId]);

    const handleRemoveAddOn = (index: number) => {
        const newAddOns = addOns.filter((addOn, i) => i !== index);
        setAddOns(newAddOns);
    };

    const formatOptions = (options: any) => {
        return options.map((option: any) => {
            return {
                label: option,
                value: option,
            };
        });
    };

    const formatEventTypeOptions = () => {
        return eventTypes.map((option: any) => {
            return {
                label: option.attributes.name,
                value: option.id,
            };
        });
    };

    const handleRemoveCustomization = (index: number) => {
        const newCustomizations = customizations.filter((customization, i) => i !== index);
        setCustomizations(newCustomizations);
    };

    const renderOptions = (customizationIndex: number, options: any) => {
        return options.map((option: any, index: number) => {
            return (
                <div key={index} className="flex flex-row gap-4 items-start">
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input a name.',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            className="input"
                            size="large"
                            placeholder="Option"
                            value={option}
                            onChange={e => {
                                const newCustomizations = customizations.map((c, i) => {
                                    if (i === customizationIndex) {
                                        c.attributes.options[index] = e.target.value;
                                    }
                                    return c;
                                });

                                setCustomizations(newCustomizations);
                            }}
                        />
                    </Form.Item>

                    <Button
                        type="text"
                        size="small"
                        onClick={() => handleRemoveOption(customizationIndex, index)}
                        className="mb-4"
                    >
                        <CloseOutlined />
                    </Button>
                </div>
            );
        });
    };

    const handleRemoveOption = (customizationIndex: number, index: number) => {
        const newCustomizations = customizations.map((customization, i) => {
            if (i === customizationIndex) {
                customization.attributes.options = customization.attributes.options.filter(
                    (option: any, j: number) => j !== index,
                );
            }
            return customization;
        });

        setCustomizations(newCustomizations);
    };

    return (
        <CreativePage>
            <div className="flex flex-col gap-2 pb-24">
                {headerLabel}

                {isLoading || loading || productLoading ? (
                    <Skeleton />
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        colon={false}
                        layout="vertical"
                    >
                        <div className="bg-white rounded mt-4">
                            <div className="flex gap-8">
                                <div className="w-1/3">
                                    <p className="text-md font-bold m-0 mt-2 mb-2">General Information</p>
                                </div>
                                <div className="w-2/3">
                                    <div className="flex-1 flex flex-row gap-4">
                                        <div className="flex flex-col flex-1">
                                            <Form.Item
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input product name.',
                                                    },
                                                ]}
                                                label="Product Name"
                                            >
                                                <Input
                                                    type="text"
                                                    className="input"
                                                    size="large"
                                                    placeholder="Enter product name"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="flex flex-col w-1/3">
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input a valid price.',
                                                    },
                                                ]}
                                                name="base_price"
                                                label="Price"
                                            >
                                                <Input
                                                    type="number"
                                                    className="input"
                                                    placeholder="0.00"
                                                    prefix="PHP"
                                                    suffix="per order"
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-8">
                                        <div className="flex-1 flex flex-col">
                                            <Form.Item name="events" label="Select Events">
                                                <Select
                                                    size="large"
                                                    mode="multiple"
                                                    style={{ width: '100%' }}
                                                    placeholder="Select type of event(s) this product/service belongs to."
                                                    onChange={c => {}}
                                                    options={formatEventTypeOptions()}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex gap-8 image-upload">
                                <div className="w-1/3">
                                    <p className="text-md font-bold m-0 mt-2 mb-2">Images</p>
                                </div>
                                <div className="w-2/3">
                                    <div className="grid grid-cols-5 gap-4 bg-white">
                                        {productImages.map((image, index) => {
                                            return (
                                                <div className="flex flex-col gap-2 items-center relative bignet-wrapper mb-4">
                                                    <div className="bignet"></div>
                                                    <a href={image.url} target="_blank" className="w-full">
                                                        <img
                                                            src={image.url}
                                                            key={index}
                                                            alt="product image"
                                                            className="rounded w-full"
                                                            style={{
                                                                aspectRatio: '1/1',
                                                            }}
                                                        />
                                                    </a>
                                                    <div className="delete-image-button">
                                                        <Button
                                                            type="text"
                                                            onClick={() => handleRemoveProductImage(index)}
                                                            className="mb-4"
                                                        >
                                                            <CloseOutlined />
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Upload
                                        name="files"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action={`${apiServerUrl}/api/upload`}
                                        beforeUpload={beforeUpload}
                                        onChange={handleProductImageChange}
                                        accept="image/png, image/jpeg"
                                    >
                                        {uploadImageButton}
                                    </Upload>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex gap-8">
                                <div className="w-1/3">
                                    <p className="text-md font-bold m-0 mt-2 mb-2">Customization</p>
                                    <p className="mb-2 m-0">
                                        Have specifications or personalizations for your products / service?{' '}
                                        <b>Customize</b>&nbsp;your offerings.
                                    </p>
                                </div>
                                <div className="w-2/3">
                                    {loadingCustomizations || productLoading ? (
                                        <Skeleton />
                                    ) : (
                                        customizations?.map((customization, index) => {
                                            return (
                                                <div key={index} className="flex flex-row gap-4 items-start">
                                                    <Form.Item name="selected">
                                                        <Switch
                                                            disabled={!customization?.disabled || false}
                                                            onChange={c => {
                                                                onCustomizationSelected(customization);
                                                            }}
                                                            defaultChecked={!customization?.disabled || false}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input a name.',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            type="text"
                                                            className="input"
                                                            size="large"
                                                            placeholder="Name"
                                                            value={customization?.attributes.name}
                                                            onChange={e => {
                                                                const newCustomizations = customizations.map((c, i) => {
                                                                    if (i === index) {
                                                                        c.attributes.name = e.target.value;
                                                                    }
                                                                    return c;
                                                                });

                                                                setCustomizations(newCustomizations);
                                                            }}
                                                            disabled={customization?.disabled || false}
                                                            defaultValue={customization?.attributes.name}
                                                        />
                                                    </Form.Item>

                                                    <div className="m-0 flex-1">
                                                        <Form.Item
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please add atleast 1 option.',
                                                                },
                                                            ]}
                                                        >
                                                            {customization?.attributes.options?.length > 0 && (
                                                                <div className="mb-4">
                                                                    {renderOptions(
                                                                        index,
                                                                        customization?.attributes.options,
                                                                    )}
                                                                    <Button
                                                                        type="default"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            const newCustomizations =
                                                                                customizations.map((c, i) => {
                                                                                    if (i === index) {
                                                                                        c.attributes.options.push(
                                                                                            'New Option',
                                                                                        );
                                                                                    }
                                                                                    return c;
                                                                                });

                                                                            setCustomizations(newCustomizations);
                                                                        }}
                                                                    >
                                                                        Add Option
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.Item>
                                                    </div>

                                                    {!customization?.disabled && (
                                                        <Button
                                                            type="text"
                                                            onClick={() => handleRemoveCustomization(index)}
                                                            className="mb-4"
                                                        >
                                                            <CloseOutlined />
                                                        </Button>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}

                                    <Button
                                        size="small"
                                        onClick={() => {
                                            // add more customizations
                                            const newCustomizations = customizations.map(customization => {
                                                return {
                                                    ...customization,
                                                };
                                            });

                                            newCustomizations.push({
                                                selected: true,
                                                attributes: {
                                                    name: 'Others',
                                                    options: ['Option 1', 'Option 2'],
                                                    disabled: false,
                                                },
                                            });
                                            setCustomizations(newCustomizations);
                                        }}
                                    >
                                        Add Customization
                                    </Button>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex gap-8">
                                <div className="w-1/3">
                                    <p className="text-md font-bold mt-4 m-0">Add-Ons</p>
                                    <p className="mb-2 m-0">
                                        Add-ons are items in your service that can additionally be added to the cart
                                        which contains additional costs.
                                    </p>
                                </div>
                                <div className="w-2/3 pt-8">
                                    {loadingAddOns ? (
                                        <Skeleton />
                                    ) : addOns?.length == 0 ? (
                                        <div>
                                            <p className="text-center m-0 bg-slate-50 p-8 rounded">
                                                You have no add-ons yet
                                            </p>
                                        </div>
                                    ) : (
                                        addOns?.map((addOn, index) => {
                                            return (
                                                <div key={index} className="flex flex-row gap-4 items-end">
                                                    <Form.Item
                                                        label="Add-on Name"
                                                        className="flex-1"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input a name.',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            type="text"
                                                            className="input"
                                                            size="large"
                                                            placeholder="Enter add-on name"
                                                            style={{ width: '100%' }}
                                                            value={addOn.name}
                                                            onChange={e => {
                                                                const newAddOns = addOns.map((a, i) => {
                                                                    if (i === index) {
                                                                        a.name = e.target.value;
                                                                    }
                                                                    return a;
                                                                });

                                                                setAddOns(newAddOns);
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Additional Price"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input a valid price.',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            type="number"
                                                            className="input"
                                                            placeholder="0.00"
                                                            prefix="PHP"
                                                            suffix="per order"
                                                            size="large"
                                                            value={addOn.price}
                                                            onChange={e => {
                                                                const newAddOns = addOns.map((a, i) => {
                                                                    if (i === index) {
                                                                        a.price = e.target.value;
                                                                    }
                                                                    return a;
                                                                });

                                                                setAddOns(newAddOns);
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <div style={{ marginBottom: '20px' }}>
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            onClick={() => handleRemoveAddOn(index)}
                                                        >
                                                            <CloseOutlined />
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <Button type="default" size="small" onClick={handleCreateAddOn} className="mt-4">
                                        Create Add-On
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* {customizationVariantCombinations && customizationVariantCombinations.length > 0 && (
                                <div>
                                    <p className="font-semibold text-md">Override Price</p>

                                    <div>
                                        {customizationVariantCombinations.map((combination, index) => (
                                            <div className="flex flex-row gap-4 rounded p-4 items-center">
                                                <div key={index} className="flex-1">
                                                    <Form.Item label="Variant Name" className="flex-1">
                                                        <p className="text-md">{combination}</p>
                                                    </Form.Item>
                                                </div>

                                                <div className="flex-1">
                                                    <Form.Item name="" label="Override Price">
                                                        <Input
                                                            type="number"
                                                            className="input"
                                                            placeholder="0.00"
                                                            prefix="PHP"
                                                            suffix="per order"
                                                            size="large"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                        <div className="flex justify-end items-end rounded-lg mt-8">
                            <div className="flex-1"></div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={createProductLoading || updateProductLoading}
                                loading={createProductLoading || updateProductLoading}
                            >
                                list product/service
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </CreativePage>
    );
};

export default CreativeProductPage;
