import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "components";

export default {
    title: "Basic/Data Entry/Checkbox",
    component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {
    type: "primary"
};

Default.decorators = [
    () => {
        return (
            <div className='flex gap-2 items-center'>
                <Checkbox />
            </div>
        );
    },
];
