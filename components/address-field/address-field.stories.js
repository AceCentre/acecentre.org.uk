import { AddressField } from "./address-field";

export default {
  title: "AddressField",
  component: AddressField,
};

const Template = (args) => <AddressField {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
