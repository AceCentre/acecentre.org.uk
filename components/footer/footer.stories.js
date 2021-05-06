import { Footer } from "./footer";

export default {
  title: "Components/Footer",
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
