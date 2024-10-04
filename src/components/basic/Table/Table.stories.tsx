import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "components";

export default {
    title: "Basic/Data Display/Table",
    component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => (
            <div className="flex items-center">
                <div className='avatar'>
                </div>
                {text}
            </div>
        ),
        width: 200,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
    },
    {
        title: 'Member ID',
        dataIndex: 'member_id',
        key: 'member_id',
        ellipsis: true,
    },
    {
        title: 'Integration ID',
        dataIndex: 'integration_id',
        key: 'integration_id',
        ellipsis: true,
    },
    {
        title: 'Mobile Phone',
        dataIndex: 'mobile_phone',
        key: 'mobile_phone',
        ellipsis: true,
    },
    {
        title: 'Card Id',
        dataIndex: 'card_id',
        key: 'card_id',
        ellipsis: true,
    },
];

export const Empty = Template.bind({});
Empty.args = {
    columns: columns
};

export const Loading = Template.bind({});
Loading.args = {
    columns: columns,
    loading: true
};


export const Basic = Template.bind({});

const data = [
    {
        key: '1',
        name: 'Russell Gutierrez',
        member_id: 'SIKLFY6054HV2H-000000003',
        email: 'russellraed@gmail.com'
    }
];

Basic.args = {
    columns: columns,
    dataSource: data
};
