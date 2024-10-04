import React, { useEffect, useMemo, useState } from 'react';
import { Button, Carousel, Divider, Skeleton } from 'antd';
import { DownOutlined, CheckCircleFilled, StarOutlined } from '@ant-design/icons';
import useMount from 'hooks/useMount';

const DashboardService = (props: any) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoadMore = () => {
        console.log('load more');
        setLoading(true);
    };

    useMount(() => {
        console.log('mounted dashboard service');
        setData(staticDataPhotography);
    });

    const handleClick = () => {
        console.log('clicked');
        // navigate to product page
        // window.open('/products/1', '_blank', 'noopener,noreferrer');
    };

    const staticDataPhotography = useMemo(() => {
        return [
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1668383207771-dcf6e2d520f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Documentary Style Photography',
                startingPrice: 'Php 1,500.00',
                location: 'Antipolo, Philippines',
                verified: true,
                rating: 5.0,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Whole Day Wedding Photography',
                startingPrice: 'Php 8,000.00',
                location: 'Makati, Philippines',
                rating: 3.0,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1488926756850-a13b25e2f415?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Documentary Style Photography',
                startingPrice: 'Php 2,500.00',
                location: 'Tagaytay, Philippines',
                verified: true,
                rating: 4.3,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: '2-Day Wedding and Events Photography',
                startingPrice: 'Php 3,000.00',
                location: 'Quezon City, Philippines',
                rating: 4.6,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1669850858880-d88baa3d24d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Prenup Photography',
                startingPrice: 'Php 5,500.00',
                location: 'Manila, Philippines',
                verified: true,
                rating: 4.9,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1551737823-dfc8495904b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Street Photography',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 3.6,
            },
            {
                images: [
                    'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Prenup Photography',
                startingPrice: 'Php 5,500.00',
                location: 'Manila, Philippines',
                verified: true,
                rating: 5.0,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Event Photography',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataVideography = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Documentary Style Videography',
                startingPrice: 'Php 1,500.00',
                location: 'Antipolo, Philippines',
                verified: true,
                rating: 5.0,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1668383207771-dcf6e2d520f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Whole Day Wedding Videography',
                startingPrice: 'Php 8,000.00',
                location: 'Makati, Philippines',
                rating: 3.0,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Documentary Style Videography',
                startingPrice: 'Php 2,500.00',
                location: 'Tagaytay, Philippines',
                verified: true,
                rating: 4.3,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1488926756850-a13b25e2f415?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: '2-Day Wedding and Events Videography',
                startingPrice: 'Php 3,000.00',
                location: 'Quezon City, Philippines',
                rating: 4.6,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1551737823-dfc8495904b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Prenup Videography',
                startingPrice: 'Php 5,500.00',
                location: 'Manila, Philippines',
                verified: true,
                rating: 4.9,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1669850858880-d88baa3d24d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Street Videography',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 3.6,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Prenup Videography',
                startingPrice: 'Php 5,500.00',
                location: 'Manila, Philippines',
                verified: true,
                rating: 5.0,
            },
            {
                images: [
                    'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
                ],
                product: 'Event Videography',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataMakeup = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1643185450492-6ba77dea00f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwfGVufDB8fDB8fHww',
                ],
                product: 'Whole Day Make-up and Hair Styling',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1596205521983-9c372fb3d4f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Group Package Make-up',
                startingPrice: 'Php 1,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataFlowerArrangement = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyJTIwYXJyYW5nZW1lbnR8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Flower Arrangements',
                startingPrice: 'Php 3,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1682097672061-69f2942c3255?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zmxvd2VyJTIwYXJyYW5nZW1lbnR8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Flower Boquets',
                startingPrice: 'Php 3,000.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1558879860-45f24b366ea1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zmxvd2VyJTIwYXJyYW5nZW1lbnR8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Reception Flower Arrangement',
                startingPrice: 'Php 6,000.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1661385738907-842d6cc2ae69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zmxvd2VyJTIwYXJyYW5nZW1lbnR8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Church Flower Designs',
                startingPrice: 'Php 4,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataBaking = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FrZXN8ZW58MHx8MHx8fDA%3D',
                ],
                product: '3-Tier Wedding Cake',
                startingPrice: 'Php 2,100.00',
                location: 'Antipolo, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FrZXN8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Dozen Cupcakes',
                startingPrice: 'Php 980.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataMusic = useMemo(() => {
        return [
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1682294456498-88dd56c8fd21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Wedding Band',
                startingPrice: 'Php 12,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1682600420019-bf44716aa917?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFuZHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Acoustic Band for Hire',
                startingPrice: 'Php 4,300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataPainting = useMemo(() => {
        return [
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Painting',
                startingPrice: 'Php 8,300.00',
                location: 'Metro Manila, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataGiveaways = useMemo(() => {
        return [
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
            {
                images: [
                    'https://plus.unsplash.com/premium_photo-1663841374856-431879a96d9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Remembrance Giveaways',
                startingPrice: 'Php 300.00',
                location: 'Makati, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    const staticDataFashion = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1619693645061-031b0585ebd7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGdvd258ZW58MHx8MHx8fDA%3D',
                ],
                product: 'Wedding Gown',
                startingPrice: 'Php 12,000.00',
                location: 'Makati, Philippines',
                rating: 4.9,
            },
        ];
    }, []);

    const staticDataHosting = useMemo(() => {
        return [
            {
                images: [
                    'https://images.unsplash.com/photo-1635520356736-90cb46f73413?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWljfGVufDB8fDB8fHww',
                ],
                product: 'Wedding Hosting',
                startingPrice: 'Php 14,300.00',
                location: 'Makati, Philippines',
                rating: 5.0,
            },
            {
                images: [
                    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1pY3xlbnwwfHwwfHx8MA%3D%3D',
                ],
                product: 'Wedding Hosting (Whole Day)',
                startingPrice: 'Php 20,000.00',
                location: 'Rizal, Philippines',
                rating: 4.8,
            },
        ];
    }, []);

    useEffect(() => {
        if (props.service?.name == 'Media') {
            setData(staticDataPhotography);
        } else if (props.service?.name == 'Videography') {
            setData(staticDataVideography);
        } else if (props.service?.name == 'Makeup') {
            setData(staticDataMakeup);
        } else if (props.service?.name == 'Flowers') {
            setData(staticDataFlowerArrangement);
        } else if (props.service?.name == 'Baking') {
            setData(staticDataBaking);
        } else if (props.service?.name == 'Music') {
            setData(staticDataMusic);
        } else if (props.service?.name == 'Painting') {
            setData(staticDataPainting);
        } else if (props.service?.name == 'Favors') {
            setData(staticDataGiveaways);
        } else if (props.service?.name == 'Fashion') {
            setData(staticDataFashion);
        } else if (props.service?.name == 'Hosting') {
            setData(staticDataHosting);
        } else {
            setData(staticDataPhotography);
        }
    }, [
        props.service,
        staticDataBaking,
        staticDataFashion,
        staticDataFlowerArrangement,
        staticDataGiveaways,
        staticDataHosting,
        staticDataMakeup,
        staticDataMusic,
        staticDataPainting,
        staticDataPhotography,
        staticDataVideography,
    ]);

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
                {data.map((d: any, index: number) => {
                    return (
                        <div key={data.id} className="flex flex-col gap-1">
                            <Carousel arrows>
                                {d.images.map((image: string, index: number) => {
                                    return (
                                        <div key={'image-' + index}>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    aspectRatio: '1/1',
                                                    width: '100%',
                                                    borderRadius: '0.5rem',
                                                }}
                                                className="cursor-pointer"
                                                onClick={handleClick}
                                            >
                                                {/* {d.verified && (
                                                    <div
                                                        className="font-semibold w-full flex text-right p-2 align-middle flex items-center"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        <div className="flex-1"></div>
                                                        <CheckCircleFilled className="text-md mr-1" />
                                                        &nbsp;<span className="text-sm">Verified</span>
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </Carousel>

                            <div className="cursor-pointer" onClick={handleClick}>
                                <div className="flex flex-row items-center">
                                    <p className="m-0 font-bold flex-1 text-sm">{d.product}</p>
                                    {/* <div className="font-semibold flex items-center gap-1">
                                        <StarOutlined />
                                        <span className="font-semibold">{d.rating}</span>
                                    </div> */}
                                </div>

                                <p className="m-0 text-sm">Starts at {d.startingPrice}</p>
                                <p className="m-0 text-sm">{d.location}</p>
                            </div>
                        </div>
                    );
                })}

                <Skeleton loading={loading} active></Skeleton>

                <Skeleton loading={loading} active></Skeleton>

                <Skeleton loading={loading} active></Skeleton>

                <Skeleton loading={loading} active></Skeleton>

                <Skeleton loading={loading} active></Skeleton>
            </div>
            {/* <Divider dashed>
                <Button type="text" className="m-0 text-black" onClick={handleLoadMore}>
                    <span className="text-sm">load more</span>&nbsp;&nbsp;
                    <span className="text-xxs">
                        <DownOutlined />
                    </span>
                </Button>
            </Divider> */}
        </div>
    );
};

export default DashboardService;
