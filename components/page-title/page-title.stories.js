import { PageTitle } from "./page-title";

export default {
  title: "About/Staff/PageTitle",
  component: PageTitle,
};

const Template = (args) => <PageTitle {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
