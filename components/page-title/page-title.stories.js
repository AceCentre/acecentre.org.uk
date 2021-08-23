import { PageTitle } from "./page-title";

export default {
  title: "Components/PageTitle",
  component: PageTitle,
};

const Template = (args) => <PageTitle {...args} />;

export const StaffPage = Template.bind({});
StaffPage.args = {
  heading: "Our team",
  description: "Our team is our greatest strength",
};

export const TrusteesPage = Template.bind({});
TrusteesPage.args = {
  heading: "Our trustees",
  description: "Meet the Ace Centre trustees",
};
