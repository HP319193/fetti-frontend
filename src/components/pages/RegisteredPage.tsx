import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from 'components/layouts';
import useMount from 'hooks/useMount';
import ReactConfetti from 'react-confetti';

const RegisteredPage = () => {
    return (
        <div className="flex w-full gap-16  h-full">
            <div className="flex items-center flex-1 p-16 justify-center h-full">
                <div className="flex flex-col flex-1 items-center justify-center h-full">
                    <ReactConfetti numberOfPieces={100} colors={['#e8107c', 'rgb(227, 211, 26)']} />

                    <h1 className="font-bold text-2xl m-0" style={{ letterSpacing: '-1px', lineHeight: '36px' }}>
                        your account is <span className="font-bold text-fetti">ready!</span>
                    </h1>
                    <p className="mb-6">You have successfully created your fetti account.</p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        awesome! let's explore
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisteredPage;
