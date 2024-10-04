import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ActionBar } from "components";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { ActionBarProps } from "./ActionBarProps";

export default {
    title: "Basic/Data Entry/Action Bar",
    component: ActionBar,
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args) => <ActionBar {...args} />;

export const Default = Template.bind({});

Default.args = {

};

Default.decorators = [
    () => {
        return (
            <div className='flex flex-col gap-2'>
                <p className="mb-2">With Search</p>
                <ActionBar {...Default.args as ActionBarProps} withSearch />
                <p className="mb-2 mt-4">With Search and Filter</p>
                <ActionBar {...Default.args as ActionBarProps} withSearch withFilter />
                <p className="mb-2 mt-4">With Custom Right Action</p>
                <ActionBar {...Default.args as ActionBarProps} withSearch withSearchDatePicker customRightActions={
                    <Button type="primary" icon={<PlusOutlined />} >Add</Button>
                } />
            </div>
        );
    },
];
