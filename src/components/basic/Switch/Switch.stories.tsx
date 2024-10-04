import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Switch } from "components";
import { SwitchProps } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default {
    title: "Basic/Data Entry/Switch",
    component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Types = Template.bind({});
Types.args = {

};

Types.decorators = [
    () => {
        return (
            <>
                <p className="mb-2">Sizes</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Switch size="small" defaultChecked />
                    <Switch {...Types.args as SwitchProps} title="test" />
                </div>

                <p className="mb-2">Disabled</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Switch disabled={true} defaultChecked />
                </div>

                <p className="mb-2">Loading</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Switch loading />
                </div>

                <p className="mb-2">With Text or Icon</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />

                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                    />
                </div>


            </>
        );
    },
];