import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavBar } from "components";

export default {
    title: "Basic/Navigation/Nav Bar",
    component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Basic = Template.bind({});

const items = [
    {
        label: 'Analytics',
        key: 'analytics'
    },
    {
        label: 'Audiences',
        key: 'audiences',
    },
    {
        label: (
            <a href="/console/people?_app_nav=edp" rel="noopener noreferrer">
                Data
            </a >
        ),
        key: 'data'
    },
    {
        label: 'Definitions',
        key: 'definitions',
        path: "/console/member_attributes?_app_nav=edp"
    },
    {
        label: (
            <a href="/console/import_definitions?_app_nav=edp" rel="noopener noreferrer">
                Integrations
            </a >
        ),
        key: 'integrations'
    }
];

Basic.args = {
    title: "Test Title",
    items: items
};

export const AppSwitcher = Template.bind({});
AppSwitcher.args = {
    title: "Test Title 2",
    items: [],
    rightActions: "test"
};
