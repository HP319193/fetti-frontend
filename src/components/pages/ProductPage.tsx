import React from 'react';
import { Button, DatePicker } from 'antd';
import useMount from 'hooks/useMount';
import { StarOutlined, LinkOutlined } from '@ant-design/icons';
import { DashboardLayout } from 'components/layouts';

const ProductPage = () => {
    useMount(() => {
        console.log('mounted dashboard');
    });

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
                <div className="flex-1">
                    <div
                        style={{
                            backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-1044696984734512758/original/85ce7e48-a228-450d-ad05-215153a3acf9.jpeg?im_w=1200')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            aspectRatio: '1/1',
                            width: '100%',
                            borderTopLeftRadius: '0.5rem',
                            borderBottomLeftRadius: '0.5rem',
                        }}
                    ></div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                    <div
                        style={{
                            backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-1044696984734512758/original/be3e324d-42ee-4c55-aac0-caaebf9138b8.jpeg?im_w=720')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            aspectRatio: '1/1',
                            width: '100%',
                        }}
                    ></div>
                    <div
                        style={{
                            backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-1044696984734512758/original/92570c72-cd37-40f0-8606-4abab80aad92.jpeg?im_w=720')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            aspectRatio: '1/1',
                            width: '100%',
                            borderTopRightRadius: '0.5rem',
                        }}
                    ></div>
                    <div
                        style={{
                            backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-1044696984734512758/original/59e61929-3030-48c1-a9f3-18fadf1d87a6.jpeg?im_w=720')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            aspectRatio: '1/1',
                            width: '100%',
                        }}
                    ></div>
                    <div
                        style={{
                            backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-1044696984734512758/original/be3e324d-42ee-4c55-aac0-caaebf9138b8.jpeg?im_w=720')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            aspectRatio: '1/1',
                            width: '100%',

                            borderBottomRightRadius: '0.5rem',
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex items-start">
                <div className="flex-1">
                    <h2 className="m-0">
                        <span className="font-semibold">Documentary Style Photography</span> by{' '}
                        <span className="font-semibold">Russell G.</span>
                    </h2>
                    <span className="text-md">Antipolo, Rizal</span>
                </div>
                <div className="flex items-center gap-1 text-md">
                    <StarOutlined />
                    <span className="">
                        5.0 based from <span className="font-semibold">5 Reviews</span>
                    </span>
                </div>
            </div>

            <div className="border-solid border-slate-100 rounded-md p-4 flex flex-row gap-4 items-center">
                <div className="flex-1 flex-col flex items-start">
                    <p className="text-sm m-0">When is your event?</p>
                    <DatePicker size="large" className="w-full" />
                </div>
                <div className="w-80">
                    <Button type="primary" size="large" className="ant-btn-xl w-full">
                        <span className="font-semibold">book now</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="flex-1">
                    <h1>This section is under construction.</h1>
                </div>
                <div className="w-80 border-solid border-slate-100 rounded-md p-4 flex flex-col">
                    <p className="font-semibold text-md text-center">When is your event?</p>

                    <Button type="primary" size="large" className="ant-btn-xl">
                        <span className="font-semibold">book now</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
