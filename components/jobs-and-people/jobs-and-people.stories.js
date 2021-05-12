import { JobsAndPeople } from "./jobs-and-people";

export default {
  title: "Careers/JobsAndPeople",
  component: JobsAndPeople,
};

const Template = (args) => <JobsAndPeople {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
