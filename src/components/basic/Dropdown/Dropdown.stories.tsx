import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Dropdown, Button } from "components";
import { Menu, DropdownProps, Space } from "antd";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

export default {
    title: "Basic/Data Entry/Dropdown",
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item (disabled)
                    </a>
                ),
                icon: <SmileOutlined />,
                disabled: true,
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item (disabled)
                    </a>
                ),
                disabled: true,
            },
            {
                key: '4',
                danger: true,
                label: 'a danger item',
            },
        ]}
    />
);

export const Types = Template.bind({});
Types.args = {
    overlay: menu
};

Types.decorators = [
    () => {
        return (
            <>
                <div className='flex items-center gap-2'>
                    <Dropdown {...Types.args as DropdownProps}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                Hover me
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

            </>
        );
    },
];