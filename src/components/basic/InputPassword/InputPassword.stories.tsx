import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputPassword } from "components";
import { InputProps } from "antd";

export default {
    title: "Basic/Data Entry/Input Password",
    component: InputPassword,
} as ComponentMeta<typeof InputPassword>;

const Template: ComponentStory<typeof InputPassword> = (args) => <InputPassword {...args} />;

export const Sizes = Template.bind({});

Sizes.args = {
    type: "primary"
};

Sizes.decorators = [
    () => {
        return (
            <div className='flex gap-2 items-center'>
                <InputPassword {...Sizes.args as InputProps} size="small" placeholder="small" />
                <InputPassword {...Sizes.args as InputProps} size="middle" placeholder="middle" />
                <InputPassword {...Sizes.args as InputProps} size="large" placeholder="large" />
            </div>
        );
    },
];
