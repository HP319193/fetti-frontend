import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextArea } from "components";

export default {
    title: "Basic/Data Display/TextArea",
    component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Basic = Template.bind({});

Basic.args = {
};

Basic.decorators = [
    () => {
        return (
            <>
                <p className="mb-2">Sizes</p>
                <div className='flex items-center gap-2 mb-4'>
                    <TextArea />
                </div>

            </>
        );
    },
];