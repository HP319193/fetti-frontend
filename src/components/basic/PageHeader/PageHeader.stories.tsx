import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageHeader } from 'components';

export default {
    title: 'Basic/Navigation/Page Header',
    component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => <PageHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title: 'People',
    description:
        'Use this screen to define demographic and related attributes for people. Person attributes may be sourced from a CRM application.',
    actions: [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ],
    onActionSelected: (e: any) => {},
};
