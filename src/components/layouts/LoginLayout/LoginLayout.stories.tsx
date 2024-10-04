import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginLayout, { LoginLayoutProps } from "./LoginLayout";

export default {
    title: "Layouts/Login Layout",
    component: LoginLayout,
} as ComponentMeta<typeof LoginLayout>;

const Template: ComponentStory<typeof LoginLayout> = (args) => <LoginLayout {...args}/>;

export const Default = Template.bind({});
Default.args = {
};

Default.decorators = [
    () => {
        return (
            <LoginLayout {...Default.args as LoginLayoutProps} />
        );
    },
];
