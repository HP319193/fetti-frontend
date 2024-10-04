import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginPage from './LoginPage';

export default {
    title: 'Pages/Auth/Login Page',
    component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage />;

export const Default = Template.bind({});

Default.decorators = [
    () => {
        return (
            <div className="flex flex-col gap-2">
                <LoginPage />
            </div>
        );
    },
];
