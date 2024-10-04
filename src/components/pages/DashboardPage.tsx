import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useMount from 'hooks/useMount';
import { DashboardLayout, LoginModal } from 'components/layouts';
import DashboardService from './DashboardService';
import { getRole, getToken, isCreativeWorker } from 'helpers';
import { useNavigate } from 'react-router-dom';
import { getServices } from 'services/message.service';
import useApi from 'hooks/useApi';
import { Affix, Button, Carousel, Divider, Input, Skeleton, message } from 'antd';
import { SearchOutlined, RightOutlined, LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import ServiceCard from './ServiceCard';
import classnames from 'clsx';
import RegisterModal from 'components/layouts/RegisterModal';
import { Parallax } from 'react-scroll-parallax';
import { AuthContext } from 'context/AuthContext';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [activeService, setActiveService] = useState<any>({});
    const [affixed, setAffixed] = useState<boolean>(false);
    const { user, isLoading } = useContext<any>(AuthContext);

    const [slider, setSlider] = useState<any>([]);
    const [slide, setSlide] = useState(0);
    let sliderRef = useRef<any>();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    useMount(() => {
        console.log('mounted dashboard page');
        localStorage.removeItem('logging-in');
        if (isCreativeWorker() && getToken()) {
            navigate('/creative/services');
        }
    });

    const { request, result, loading } = useApi({
        api: getServices,
    });

    const fetchServices = useCallback(
        (requestState: {}) => {
            request(requestState)
                .then(result => {
                    console.log('result', result);
                    let records = result?.data?.data?.map((c: any) => {
                        return {
                            ...c.attributes,
                            key: c.id,
                            id: c.id,
                        };
                    });

                    setServices(records);
                    setActiveService(records[0]);

                    const max = 6;
                    let count = 0;
                    let arr: any = [];
                    let slider: any = [];
                    records.forEach((record: any) => {
                        if (count < max) {
                            arr.push(record);
                            count++;
                        } else {
                            arr.push(record);
                            slider.push(arr);
                            arr = [];
                            count = 0;
                        }
                    });
                    if (arr.length > 0) {
                        for (let i = arr.length; i <= max; i++) {
                            arr.push({});
                        }

                        slider.push(arr);
                    }

                    setSlider(slider);
                })
                .catch(error => {
                    message.error(error.message);
                });
        },
        [request],
    );

    useMount(() => {
        fetchServices({});
        if (user) {
            localStorage.setItem('role', 'creative-worker');
            window.location.href = '/creative/services';
        }
    });

    useEffect(() => {});

    const backgrounds = [
        {
            url: '/images/landing/slide-1-transformed.png',
            width: '45%',
        },
        {
            url: '/images/landing/slide-2-transformed.png',
            width: '45%',
        },
        // '/images/landing/slide-3.png',//
        {
            url: '/images/landing/slide-4-transformed.png',
            width: '60%',
        },
        {
            url: '/images/landing/slide-5-transformed.png',
            width: '50%',
        },
        {
            url: '/images/landing/slide-6-transformed.png',
            width: '50%',
        },
        {
            url: '/images/landing/slide-7-transformed.png',
            width: '45%',
        },
        // '/images/landing/slide-8-transformed.png',
    ];

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            console.log('slide before:', slide);
            console.log('length:', backgrounds.length);
            if (slide < backgrounds.length - 1) {
                setSlide(slide + 1);
                console.log('slide after 0:', slide);
            } else {
                setSlide(0);
                console.log('slide after 1:', slide);
            }
        }, 4000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [slide, backgrounds.length]);

    const handleAffixChange = (affixed?: boolean) => {
        setAffixed(affixed || false);
    };

    const contentStyle: React.CSSProperties = {
        margin: 0,
        color: '#fff',
        textAlign: 'left',
        padding: '44px',
        verticalAlign: 'middle',
        position: 'absolute',
        bottom: '30%',
        zIndex: 999,
    };

    const showLoginModal = () => {
        localStorage.setItem('navigate-back', window.location.pathname);
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const showRegisterModal = () => {
        localStorage.setItem('navigate-back', window.location.pathname);
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div className="flex flex-col w-full h-auto pb-16" id="landing">
            <div className="relative w-screen ">
                <div className="bg-fetti" style={{ height: '85vh' }}>
                    <div style={contentStyle}>
                        <img src="/images/landing/carousel-a.png" style={{ width: '50%' }} />
                        <div style={{ width: '40%' }} className="search-landing">
                            <Input suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} size="large" />
                        </div>
                    </div>

                    {backgrounds.map((background: any, index: number) => {
                        return (
                            <div
                                className={classnames('absolute', index == slide ? 'fade-in' : 'fade-out')}
                                style={{ left: 0, top: 0, height: '100%', width: '100%' }}
                            >
                                <img
                                    style={{
                                        width: background.width,
                                        bottom: '0',
                                        right: '0',
                                        position: 'absolute',
                                    }}
                                    src={background.url}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col px-4 py-8 gap-4 md:px-16 lg:px-16">
                <h1 className="m-0" style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '32px' }}>
                    Discovering hidden gems in
                </h1>
                <div
                    className="items-start bg-white pb-2"
                    style={{
                        borderBottom: affixed ? '3px solid #dfdfdf52' : 'none',
                        zIndex: 999,
                    }}
                >
                    {loading ? (
                        <div className="flex gap-2">
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                            <Skeleton.Button active={true} size="large" shape="default" block />
                        </div>
                    ) : (
                        <div className="flex">
                            <div className="items-center" style={{ zIndex: '9999', marginTop: '60px' }}>
                                <LeftCircleFilled
                                    onClick={() => {
                                        sliderRef.current.prev();
                                    }}
                                    style={{ fontSize: '34px', marginRight: '-12px', color: 'gainsboro' }}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <Carousel
                                    dots={false}
                                    ref={slider => {
                                        sliderRef.current = slider;
                                    }}
                                >
                                    {slider.map((slide: any) => {
                                        return (
                                            <div>
                                                <div className="flex flex-row gap-4 pb-16 relative">
                                                    {slide.map((service: any, index: number) => (
                                                        <div
                                                            className="flex-1 items-center rounded gap-8 cursor-pointer items-start hover:opacity-90 transition-all"
                                                            onClick={() => {
                                                                if (service.name && index < 1) {
                                                                    setActiveService(service);
                                                                }
                                                            }}
                                                        >
                                                            <ServiceCard
                                                                photoUrl={
                                                                    service?.thumbnail?.data?.attributes?.formats?.small
                                                                        ?.url
                                                                }
                                                                name={service?.name}
                                                                color={service?.color}
                                                                active={activeService === service}
                                                                height="240px"
                                                                fontSize="18px"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            </div>
                            <div className="items-center mt-12" style={{ zIndex: '9999', marginTop: '60px' }}>
                                <RightCircleFilled
                                    onClick={() => {
                                        sliderRef.current.next();
                                    }}
                                    style={{ fontSize: '34px', marginLeft: '-12px', color: 'gainsboro' }}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 relative pb-16">
                    <DashboardService name={activeService?.name} service={activeService} />
                </div>
            </div>

            <div className="flex flex-col gap-4 relative p-8 px-16 shadow-md" style={{ background: '#FAF6F8' }}>
                <div className="flex flex-col items-center">
                    <h1
                        style={{
                            fontWeight: 600,
                            fontFamily: 'TTNormsBold',
                            fontSize: '42px',
                            marginTop: '24px',
                            letterSpacing: '-1px',
                        }}
                        className="text-center mb-0"
                    >
                        celebrating{' '}
                        <span
                            className="text-fetti"
                            style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '42px' }}
                        >
                            love.
                        </span>
                    </h1>
                    <div className="text-md" style={{ maxWidth: '500px', marginBottom: '12px' }}>
                        <p className="text-center text-md" style={{ maxWidth: '500px' }}>
                            With{' '}
                            <span className="text-fetti-pink italic" style={{ fontWeight: 600 }}>
                                fetti
                            </span>
                            , we make event planning so easy that you can focus on what really matters: celebrating the
                            people you love.
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-8 relative">
                    <div className="flex-1 text-center text-md">
                        <img src="/images/group-1/1.png" style={{ width: '100%' }} className="rounded-lg" />
                        <div className="p-4">
                            <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '24px' }}>
                                Discover Creative Suppliers
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                We are working to ensure that you are connected only to trustworthy but creative event
                                suppliers for the best possible event planning experience. Discover talents in your
                                area!
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <img src="/images/group-1/2.png" style={{ width: '100%' }} className="rounded-lg" />

                        <div className="p-4">
                            <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '24px' }}>
                                Organize Your Events Easily
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                fetti's features were created to revolutionize the way event planners organize their
                                events. It's both intuitive and fun! A planning experience that is truly fetti's.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <img src="/images/group-1/3.png" style={{ width: '100%' }} className="rounded-lg" />
                        <div className="p-4">
                            <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '24px' }}>
                                Secure Payments
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                fetti adds a layer of protection to event planners by implementing milestone payments
                                where the full payment gets transacted only when the service is delivered.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 relative p-16 bg-white">
                <div className="flex flex-row gap-8 relative items-center">
                    <div className="flex flex-col items-start flex-1">
                        <h1
                            style={{
                                fontWeight: 600,
                                fontFamily: 'TTNormsBold',
                                fontSize: '32px',
                                letterSpacing: '-1px',
                            }}
                            className="mb-0"
                        >
                            Plan any event.
                        </h1>
                        <p className="text-md mb-0">We have creative suppliers servicing different types of event.</p>
                    </div>
                    <div>
                        <Button type="primary" size="large" onClick={showRegisterModal}>
                            Start Planning
                        </Button>
                    </div>
                </div>
                <div className="flex grid grid-cols-4 gap-8 w-full">
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/1.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Weddings</h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/2.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Birthday</h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/3.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Baptism</h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/4.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>
                            Business Launch
                        </h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/5.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>
                            Corporate Events
                        </h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/6.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Baby Shower</h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/7.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Engagement</h2>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/images/group-2/8.png" style={{ width: '100%' }} className="rounded-lg" />
                        <h2 style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '18px' }}>Anniversary</h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-fetti-gradient-v2 py-16 pl-16 gap-12" style={{ paddingRight: '8.5rem' }}>
                <h1
                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '42px', letterSpacing: '-1px' }}
                    className="mb-0 text-white text-center"
                >
                    Make it one for the books. Add your own kind of magic.
                </h1>

                <div className="relative">
                    <div className="flex absolute w-full h-full" style={{ top: 0, left: 0, zIndex: 9 }}>
                        <div className="flex-1"></div>
                        <div
                            className="bg-white padding-md rounded-md h-full rounded-md"
                            style={{ width: '57%', height: '600px' }}
                        ></div>
                    </div>
                    <div className="flex" style={{ zIndex: 10 }}>
                        <div style={{ width: '60%' }} className=" relative">
                            <img
                                src="/images/mac.png"
                                style={{ width: '110%', zIndex: 999, marginTop: '90px' }}
                                className="absolute"
                            />
                        </div>
                        <div className="flex-1 py-16 pl-16 pr-16" style={{ zIndex: 999, height: '700px' }}>
                            <h1
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    lineHeight: '52px',
                                    letterSpacing: '-1px',
                                }}
                                id="helping-you-label"
                            >
                                Helping you plan your <br />
                                event <span className="underline font-bold">step by step.</span>
                            </h1>
                            <div style={{ marginTop: '32px' }} id="as-easy-as-123">
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontFamily: 'TTNormsBold',
                                        backgroundColor: '#E8107C',
                                    }}
                                    className="p-2 italics text-white rounded-md italic"
                                >
                                    As easy as 1,2,3.
                                </span>
                            </div>
                            <div className="mt-8 gap-4 flex flex-col" id="as-easy-as-123-steps">
                                <p
                                    className="m-0 text-md instructions"
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold' }}
                                >
                                    1. Choose your type of event.
                                </p>
                                <p
                                    className="m-0 text-md instructions"
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold' }}
                                >
                                    2. Select your must haves.
                                </p>
                                <p
                                    className="m-0 text-md instructions"
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold' }}
                                >
                                    3. Discover trustworthy creative <br />
                                    event suppliers near you.
                                </p>
                            </div>

                            <div className="flex mt-12">
                                <div className="flex-1"></div>
                                <a
                                    href="#"
                                    style={{
                                        padding: '16px 28px',
                                        color: 'white',
                                        background: 'black',
                                        borderRadius: '8px',
                                        fontFamily: 'TTNormsBold',
                                    }}
                                    onClick={showRegisterModal}
                                    id="simulate-my-event-button"
                                >
                                    Simulate my event
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-16">
                <img src="/images/strip-1.png" className="w-full" />
            </div>

            <div className="flex flex-col relative px-16" style={{ paddingTop: '52px' }}>
                <div className="flex flex-col items-center">
                    <h1
                        style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '42px', letterSpacing: '-1px' }}
                        className="text-center mb-0"
                    >
                        celebrating{' '}
                        <span
                            className="text-fetti"
                            style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '42px' }}
                        >
                            creativity.
                        </span>
                    </h1>
                    <div className="text-md mt-8" style={{ maxWidth: '800px' }}>
                        <p className="text-center text-md">
                            As fans of creatives, we believe in the rich value of creative talent. We created{' '}
                            <b className="text-fetti-pink font-bold" style={{ fontFamily: 'TTNormsBold' }}>
                                <i className="text-fetti-pink font-bold">fetti</i>
                            </b>{' '}
                            with the hope of establishing the creatives’ worth and, with it, living in a world where the
                            creative profession is celebrated. To create a place where natural creatives can live doing
                            what they love.
                        </p>
                        <p
                            className="text-center text-md"
                            style={{ color: '#545454', fontFamily: 'TTNormsBold', marginTop: '12px' }}
                        >
                            Help make people's dream event come true with your talent.
                        </p>

                        <div className="text-center flex items-center justify-center mt-12">
                            <Button type="primary" size="large" onClick={showRegisterModal}>
                                Join as a creative worker
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 relative px-12" style={{ paddingTop: '36px' }}>
                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/1.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>
                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                Grow your business
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Unleash your creativity with fetti. Display your skills to a global audience, maximize
                                the opportunities, and turn your passion into income effortlessly.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/5.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>
                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                Organize your calendar
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Streamline your schedule with our intuitive calendar, featuring seamless event creation
                                and smart reminders that will help improve the organization of your business.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/4.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>

                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                Manage your services
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Simplify your workflow with our intuitive dashboard. From seamless organization to smart
                                features, stay in control and boost productivity effortlessly.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/2.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>
                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                Communicate on time
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Enhance client communication with our platform. Streamline interactions, foster stronger
                                connections, and elevate your client relationships for improved collaboration and
                                satisfaction.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/3.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>
                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                Securely receive payments
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Receive payments securely. Ensure swift transactions, protect sensitive information, and
                                enjoy peace of mind in every financial exchange. fetti makes sure that you get the
                                payments for your services on time.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 text-center text-md">
                        <div className="p-8">
                            <div
                                style={{
                                    backgroundImage: "url('/images/group-3/6.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '500px',
                                    borderRadius: '12px',
                                }}
                            ></div>
                            <h2
                                style={{
                                    fontWeight: 600,
                                    fontFamily: 'TTNormsBold',
                                    fontSize: '24px',
                                    marginTop: '12px',
                                }}
                            >
                                All in one account
                            </h2>
                            <p style={{ fontSize: '16px' }}>
                                Say hello to the convenience of managing multiple creative businesses. Our comprehensive
                                solution brings together everything you need to thrive in one convenient account.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="text-center flex items-center justify-center mt-8 mb-16"
                    id="list-of-creative-event-services"
                >
                    <Button type="primary" size="large" onClick={showRegisterModal}>
                        List my creative event services
                    </Button>
                </div>
            </div>

            <div
                className="flex flex-col gap-4 relative p-16 bg-fetti-gradient-v3 text-center relative"
                style={{ paddingTop: '60px', paddingBottom: '220px' }}
            >
                <div className="justify-center items-center flex text-center">
                    <h2
                        style={{
                            fontWeight: 600,
                            fontFamily: 'TTNormsBold',
                            fontSize: '42px',
                            width: 'auto',
                            lineHeight: '46px',
                            letterSpacing: '-1px',
                            marginTop: '8px',
                        }}
                        className="text-white text-center"
                    >
                        Choose heartfelt.
                        <br />
                        Check out creative personalized gifts.
                    </h2>
                </div>

                <div className="absolute w-full" style={{ position: 'absolute', bottom: '-230px', left: '0' }}>
                    <div className="flex gap-8 w-full px-16">
                        <div className="flex-1 text-start text-md">
                            <div>
                                <div
                                    style={{
                                        backgroundImage: "url('/images/group-3/7.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '320px',
                                        borderRadius: '12px',
                                    }}
                                    className="mb-4"
                                ></div>

                                <h2
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '16px' }}
                                    className="m-0"
                                >
                                    Personalized Avatar Mugs
                                </h2>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Starts at Php 1,500
                                </p>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Makati, Philippines
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 text-start text-md">
                            <div>
                                <div
                                    style={{
                                        backgroundImage: "url('/images/group-3/8.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '320px',
                                        borderRadius: '12px',
                                    }}
                                    className="mb-4"
                                ></div>
                                <h2
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '16px' }}
                                    className="m-0"
                                >
                                    Customized Jewelry
                                </h2>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Starts at Php 8,000
                                </p>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Cavite, Philippines
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 text-start text-md">
                            <div>
                                <div
                                    style={{
                                        backgroundImage: "url('/images/group-3/9.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '320px',
                                        borderRadius: '12px',
                                    }}
                                    className="mb-4"
                                ></div>
                                <h2
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '16px' }}
                                    className="m-0"
                                >
                                    Digital Painting
                                </h2>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Starts at Php 500
                                </p>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Bulacan, Philippines
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 text-start text-md">
                            <div>
                                <div
                                    style={{
                                        backgroundImage: "url('/images/group-3/10.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '320px',
                                        borderRadius: '12px',
                                    }}
                                    className="mb-4"
                                ></div>
                                <h2
                                    style={{ fontWeight: 600, fontFamily: 'TTNormsBold', fontSize: '16px' }}
                                    className="m-0"
                                >
                                    1 Minute Love Song
                                </h2>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Starts at Php 5,000
                                </p>
                                <p style={{ fontSize: '16px' }} className="m-0">
                                    Laguna, Philippines
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex block h-40 p-40"></div>

            <div className="flex w-full shadow" style={{ backgroundColor: '#FAF6F8' }}>
                <img src="/images/landing-footer.png" style={{ width: '45%' }} />
                <div className="flex flex-1 justify-center flex-col items-center gap-4">
                    {' '}
                    <h2
                        style={{
                            fontWeight: 600,
                            fontFamily: 'TTNormsBold',
                            fontSize: '36px',
                            width: '700px',
                            lineHeight: '42px',
                            letterSpacing: '-1px',
                        }}
                        className="text-center"
                    >
                        Empowering the DIY event <br />
                        community through creative talent.
                    </h2>
                    <Button type="primary" size="large" onClick={showRegisterModal}>
                        Join fetti
                    </Button>
                </div>
            </div>

            <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
            <RegisterModal open={isRegisterModalOpen} onClose={closeRegisterModal} />
        </div>
    );
};

export default DashboardPage;
