import { InformationDays } from "./information-days";

export default {
  title: "/Services/InformationDays",
  component: InformationDays,
};

const Template = (args) => <InformationDays {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
