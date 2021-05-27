import { ProductFilters } from "./product-filters";

export default {
  title: "Resources/ProductFilters",
  component: ProductFilters,
};

const Template = (args) => <ProductFilters {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
