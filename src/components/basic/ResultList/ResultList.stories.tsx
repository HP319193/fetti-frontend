import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ResultList } from "components";
import { ButtonProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default {
    title: "Basic/Data Display/Result List",
    component: ResultList,
} as ComponentMeta<typeof ResultList>;

const Template: ComponentStory<typeof ResultList> = (args) => <ResultList {...args} />;

export const Types = Template.bind({});
Types.args = {
};


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

const data = [
    {
        key: '1',
        name: 'Russell Gutierrez',
        member_id: 'SIKLFY6054HV2H-000000003',
        email: 'russellraed@gmail.com'
    }
];

Types.decorators = [
    () => {
        return (<ResultList columns={columns} dataSource={data}></ResultList>);
    },
];
