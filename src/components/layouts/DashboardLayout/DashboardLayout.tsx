import React, { useContext, useState } from 'react';
import styles from './DashboardLayout.module.scss';
import classnames from 'clsx';
import { Affix, Layout, Skeleton } from 'antd';
import Footer from '../Footer/Footer';
import Header from '../Header';
import { AuthContext } from 'context/AuthContext';
import useMount from 'hooks/useMount';
import ReactConfetti from 'react-confetti';

const DashboardLayout = (
    props: any & {
        children?: React.ReactNode;
    },
) => {
    const { user, isLoading } = useContext<any>(AuthContext);
    const [affixed, setAffixed] = useState<boolean>(false);

    const handleAffixChange = (affixed?: boolean) => {
        setAffixed(affixed || false);
    };

    useMount(() => {
        console.log('mounted dashboard layout');
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    });

    const isCreativePage = window.location.pathname.indexOf('/creative') === 0;
    const fullWidth = window.location.pathname === '/' || isCreativePage;

    return (
        <Layout
            className={classnames(styles.DashboardLayout, 'w-screen min-h-screen h-full flex flex-col overflow-x-auto')}
        >
            {/* <div className="p-4 text-center fetti-border-bottom bg-slate-50 overflow-hidden relative">
                <ReactConfetti numberOfPieces={100} colors={['#e8107c', 'rgb(227, 211, 26)']} />
                <div className="m-0 relative text-sm">
                    <a href="https://www.fetti.love" target="_blank" className="font-semibold text-fetti-pink text-sm">
                        Learn more
                    </a>{' '}
                    on how you can use fetti as an event planner or creative worker.
                </div>
            </div> */}
            <Affix onChange={handleAffixChange}>
                <Header loading={isLoading} fullWidth={fullWidth} affixed={affixed} landing={props.landing} />
            </Affix>
            <div className={classnames('flex flex-row flex-1 w-screen h-full bg-white gap-8 relative overflow-auto')}>
                {isLoading && (
                    <div className="p-16 w-full">
                        <Skeleton loading={true} active />
                    </div>
                )}

                {!isLoading && props.children}
            </div>

            <Affix offsetBottom={0} onChange={handleAffixChange}>
                <Footer fullWidth={fullWidth} />
            </Affix>
        </Layout>
    );
};

export default DashboardLayout;
