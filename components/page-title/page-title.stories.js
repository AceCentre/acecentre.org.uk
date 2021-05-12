import { PageTitle } from "./page-title";

export default {
  title: "Components/PageTitle",
  component: PageTitle,
};

const Template = (args) => <PageTitle {...args} />;

export const StaffPage = Template.bind({});
StaffPage.args = {
  heading: "Our people",
  description: "Our people are our greatest strength",
};

export const TrusteesPage = Template.bind({});
TrusteesPage.args = {
  heading: "Our trustees",
  description: "Meet the AceCentre trustees",
};
