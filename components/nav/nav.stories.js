import { Nav } from "./nav";

export default {
  title: "Components/Nav",
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const EmptyCart = Template.bind({});
EmptyCart.args = {};

export const ItemsInCart = Template.bind({});
ItemsInCart.args = {
  numberOfItemsInCart: 2,
};
