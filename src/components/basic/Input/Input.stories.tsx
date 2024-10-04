import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "components";
import { InputProps } from "antd";

export default {
    title: "Basic/Data Entry/Input",
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Sizes = Template.bind({});

Sizes.args = {
    type: "primary"
};

Sizes.decorators = [
    () => {
        return (
            <div className='flex gap-2 items-center'>
                <Input {...Sizes.args as InputProps} size="small" placeholder="small" />
                <Input {...Sizes.args as InputProps} size="middle" placeholder="middle" />
                <Input {...Sizes.args as InputProps} size="large" placeholder="large" />
            </div>
        );
    },
];
