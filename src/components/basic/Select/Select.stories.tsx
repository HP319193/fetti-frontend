import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "components";
import { ButtonProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default {
    title: "Basic/General/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Types = Template.bind({});
Types.args = {
    size: "middle"
};

Types.decorators = [
    () => {
        return (
            <>
                <div className='flex items-center gap-2'>
                    <Button {...Types.args as ButtonProps} type="dashed" children="dashed" />
                    <Button {...Types.args as ButtonProps} type="default" children="default" />
                    <Button {...Types.args as ButtonProps} type="primary" children="primary" />
                    <Button {...Types.args as ButtonProps} type="ghost" children="ghost" />
                    <Button {...Types.args as ButtonProps} type="link" children="link" />
                    <Button {...Types.args as ButtonProps} type="text" children="text" />
                </div>

            </>
        );
    },
];

export const Sizes = Template.bind({});
Sizes.args = {
    type: "primary"
};

Sizes.decorators = [
    () => {
        return (
            <div>
                <div className='flex items-center gap-2'>
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="small" children="small" />
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="middle" children="middle" />
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="large" children="large" />
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Button {...Sizes.args as ButtonProps} type="default" size="small" children="small" />
                    <Button {...Sizes.args as ButtonProps} type="default" size="middle" children="middle" />
                    <Button {...Sizes.args as ButtonProps} type="default" size="large" children="large" />
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Button {...Sizes.args as ButtonProps} size="small" children="small" />
                    <Button {...Sizes.args as ButtonProps} size="middle" children="middle" />
                    <Button {...Sizes.args as ButtonProps} size="large" children="large" />
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="small" children="small" danger />
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="middle" children="middle" danger />
                    <Button {...Sizes.args as ButtonProps} type="dashed" size="large" children="large" danger />
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Button {...Sizes.args as ButtonProps} type="default" size="small" children="small" danger />
                    <Button {...Sizes.args as ButtonProps} type="default" size="middle" children="middle" danger />
                    <Button {...Sizes.args as ButtonProps} type="default" size="large" children="large" danger />
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Button {...Sizes.args as ButtonProps} size="small" children="small" danger />
                    <Button {...Sizes.args as ButtonProps} size="middle" children="middle" danger />
                    <Button {...Sizes.args as ButtonProps} size="large" children="large" danger />
                </div>
            </div >
        );
    },
];

export const States = Template.bind({});
States.args = {
};

States.decorators = [
    () => {
        return (
            <div>
                <p className="mb-2">Loading</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Button {...States.args as ButtonProps} type="default" children="default" loading />
                    <Button {...States.args as ButtonProps} type="dashed" children="dashed" loading />
                    <Button {...States.args as ButtonProps} type="primary" children="primary" loading />
                    <Button {...States.args as ButtonProps} type="ghost" children="ghost" loading />
                    <Button {...States.args as ButtonProps} type="link" children="link" loading />
                    <Button {...States.args as ButtonProps} type="text" children="text" loading />
                </div>
                <p className="mb-2">Disabled</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Button {...States.args as ButtonProps} type="dashed" children="default" disabled />
                    <Button {...States.args as ButtonProps} type="default" children="dashed" disabled />
                    <Button {...States.args as ButtonProps} type="primary" children="primary" disabled />
                    <Button {...States.args as ButtonProps} type="ghost" children="ghost" disabled />
                    <Button {...States.args as ButtonProps} type="link" children="link" disabled />
                    <Button {...States.args as ButtonProps} type="text" children="text" disabled />
                </div>
                <p className="mb-2">Danger</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Button {...States.args as ButtonProps} type="dashed" children="dashed" danger />
                    <Button {...States.args as ButtonProps} type="default" children="default" danger />
                    <Button {...States.args as ButtonProps} type="primary" children="primary" danger />
                    <Button {...States.args as ButtonProps} type="ghost" children="ghost" danger />
                    <Button {...States.args as ButtonProps} type="link" children="link" danger />
                    <Button {...States.args as ButtonProps} type="text" children="text" danger />
                </div>
            </div>
        );
    },
];

export const Shapes = Template.bind({});
Shapes.args = {
};
Shapes.decorators = [
    () => {
        return (
            <div>
                <p className="mb-2">Circle</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Button {...Shapes.args as ButtonProps} type="default" icon={<DownloadOutlined />} shape="circle" />
                    <Button {...Shapes.args as ButtonProps} type="dashed" icon={<DownloadOutlined />} shape="circle" />
                    <Button {...Shapes.args as ButtonProps} type="primary" icon={<DownloadOutlined />} shape="circle" />
                    <Button {...Shapes.args as ButtonProps} type="ghost" icon={<DownloadOutlined />} shape="circle" />
                    <Button {...Shapes.args as ButtonProps} type="link" icon={<DownloadOutlined />} shape="circle" />
                    <Button {...Shapes.args as ButtonProps} type="text" icon={<DownloadOutlined />} shape="circle" />
                </div>
                <p className="mb-2">Round</p>
                <div className='flex items-center gap-2 mb-4'>
                    <Button {...Shapes.args as ButtonProps} type="default" children="Download" icon={<DownloadOutlined />} shape="round" />
                    <Button {...Shapes.args as ButtonProps} type="dashed" children="Download" icon={<DownloadOutlined />} shape="round" />
                    <Button {...Shapes.args as ButtonProps} type="primary" children="Download" icon={<DownloadOutlined />} shape="round" />
                    <Button {...Shapes.args as ButtonProps} type="ghost" children="Download" icon={<DownloadOutlined />} shape="round" />
                    <Button {...Shapes.args as ButtonProps} type="link" children="Download" icon={<DownloadOutlined />} shape="round" />
                    <Button {...Shapes.args as ButtonProps} type="text" children="Download" icon={<DownloadOutlined />} shape="round" />
                </div>
            </div>
        );
    },
];