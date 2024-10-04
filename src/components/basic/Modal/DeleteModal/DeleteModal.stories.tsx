import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeleteModal } from "components";

export default {
    title: "Modals/Delete Modal",
    component: DeleteModal,
} as ComponentMeta<typeof DeleteModal>;

const Template: ComponentStory<typeof DeleteModal> = (args) => <DeleteModal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    isModalOpen: true
};
