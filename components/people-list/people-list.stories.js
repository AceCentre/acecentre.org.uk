import { PeopleList } from "./people-list";

export default {
  title: "Components/PeopleList",
  component: PeopleList,
};

const Template = (args) => <PeopleList {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
