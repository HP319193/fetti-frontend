import React, { FunctionComponent, useContext } from 'react';
import useMount from 'hooks/useMount';
import { DashboardLayout } from 'components/layouts';
import { CalendarOutlined } from '@ant-design/icons';
import classnames from 'clsx';
import { Avatar, Button, Divider, Skeleton } from 'antd';
import CreativePage from './CreativePage';
import { AuthContext } from 'context/AuthContext';
import useApi from 'hooks/useApi';
import { getProductsByServiceId, getService, getServices } from 'services/message.service';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftCircleFilled } from '@ant-design/icons';

const CreativeViewServicePage = (props: any) => {
    const navigate = useNavigate();
    const { user, isLoading } = useContext<any>(AuthContext);
    const [products, setProducts] = React.useState<any[]>([]);
    const [service, setService] = React.useState<any>({});
    const params = useParams();

    useMount(() => {
        console.log('id is ', params?.serviceId);
        fetchService();
        fetchProducts();
    });

    const { request, result, loading } = useApi({
        api: getService,
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

    const {
        request: requestProducts,
        result: resultProducts,
        loading: loadingProducts,
    } = useApi({
        api: getProductsByServiceId,
    });

    const fetchProducts = () => {
        requestProducts({ serviceId: params?.serviceId, userId: user?.id })
            .then(result => {
                console.log(result);
                setProducts(result?.data?.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <CreativePage>
            <div className="flex flex-row items-center mb-4 gap-4">
                <div>
                    <LeftCircleFilled
                        onClick={() => {
                            navigate('/creative/services');
                        }}
                        style={{ fontSize: '34px' }}
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex-1 gap-0 flex flex-col">
                    <h2 className="m-0 font-bold lowercase" style={{ letterSpacing: '-1px', lineHeight: '22px' }}>
                        {service?.attributes?.name}
                    </h2>
                    <p className="m-0">
                        You currently have <b>{products.length} products/services</b> in this service. Click on a
                        product/service to edit.
                    </p>
                </div>
            </div>

            {isLoading || loading || loadingProducts ? (
                <Skeleton />
            ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-24">
                    {products.map((product, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col grid-2"
                                onClick={() =>
                                    navigate(`/creative/services/${params?.serviceId}/products/${product.id}`)
                                }
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${product.attributes.images[0].url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        aspectRatio: '1/1',
                                        width: '100%',
                                        borderRadius: '0.5rem',
                                        height: '200px',
                                    }}
                                    className="cursor-pointer"
                                ></div>
                                <div className="flex flex-col items-start mt-2">
                                    <p
                                        className="m-0 font-bold flex-1"
                                        style={{ lineHeight: '13px', fontSize: '16px' }}
                                    >
                                        {product.attributes.name}
                                    </p>

                                    <span className="m-0 text-xs">
                                        Starts with <b>₱ {product.attributes.base_price}</b>
                                    </span>
                                </div>
                                {product.attributes.description && (
                                    <p className="text-sm">{product.attributes.description}</p>
                                )}
                            </div>
                        );
                    })}

                    <div className="flex flex-col grid-2 flex-1">
                        <div
                            className="w-full items-center flex justify-center p-4"
                            style={{
                                aspectRatio: '1/1',
                                borderRadius: '18px',
                                height: '200px',
                                background: '#FAFAFA',
                            }}
                        >
                            <p className="text-center items-center m-0">
                                <Button
                                    type="primary"
                                    onClick={() => navigate(`/creative/services/${params?.serviceId}/product-add`)}
                                    size="small"
                                >
                                    <span className="font-semibold">add product / service</span>
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="h-96 w-full justify-center items-center content-center flex"
                    style={{ background: '#FAFAFA' }}
                >
                    <div className="justify-center items-center content-center flex flex-col">
                        <p className="m-0 mb-1">You have no product / service yet.</p>
                        <Button
                            type="primary"
                            onClick={() => navigate(`/creative/services/${params?.serviceId}/product-add`)}
                            className="text-md"
                        >
                            add product / service
                        </Button>
                    </div>
                </div>
            )}
        </CreativePage>
    );
};

export default CreativeViewServicePage;
