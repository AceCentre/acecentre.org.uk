import { CheckoutAddress } from "./checkout-address";

export default {
  title: "CheckoutAddress",
  component: CheckoutAddress,
};

const Template = (args) => <CheckoutAddress {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
