import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DashboardLayout from "./DashboardLayout";

export default {
    title: "Layouts/Dashboard Layout",
    component: DashboardLayout,
} as ComponentMeta<typeof DashboardLayout>;

const Template: ComponentStory<typeof DashboardLayout> = (args) => <DashboardLayout />;

export const Default = Template.bind({});
Default.args = {
};

Default.decorators = [
    () => {
        return (
            <DashboardLayout>
                <div className="bg-white rounded p-8">
                    Hello World!
                </div>
            </DashboardLayout>
        );
    },
];
