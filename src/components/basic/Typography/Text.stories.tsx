import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Text, { TextProps } from './Text';

export default {
    title: "Basic/Data Display/Text",
    component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Sizes = Template.bind({});
export const FontWeight = Template.bind({});
Sizes.args = {

};

Sizes.decorators = [
    () => {
        return (
            <div>
                <Text {...Sizes.args as TextProps} size="text-xl">This is an extra large text.</Text>
                <Text {...Sizes.args as TextProps} size="text-lg">This is a large text.</Text>
                <Text {...Sizes.args as TextProps} size="text-md">This is a medium text.</Text>
                <Text {...Sizes.args as TextProps} size="text-sm">This is a small text.</Text>
            </div>
        );
    },
];

FontWeight.args = {

};

FontWeight.decorators = [
    () => {
        return (
            <div>
                <Text {...Sizes.args as TextProps} fontWeight='font-bold'>This is a BOLD text.</Text>
                <Text {...Sizes.args as TextProps} fontWeight='font-semibold'>This is a SEMIBOLD text.</Text>
                <Text {...Sizes.args as TextProps} fontWeight='font-medium'>This is a MEDIUM text.</Text>
                <Text {...Sizes.args as TextProps} fontWeight='font-normal'>This is a NORMAL text.</Text>
            </div>
        );
    },
];
