import { ServicesGrid } from "./services-grid";

export default {
  title: "/Services/Grid",
  component: ServicesGrid,
};

const Template = (args) => <ServicesGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
