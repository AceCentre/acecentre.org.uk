import { FundraisingIdeas } from "./fundraising-ideas";

export default {
  title: "/GetInvolved/FundraisingIdeas",
  component: FundraisingIdeas,
};

const Template = (args) => <FundraisingIdeas {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
