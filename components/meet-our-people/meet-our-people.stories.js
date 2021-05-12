import { MeetOurPeople } from "./meet-our-people";

export default {
  title: "About/Staff/MeetOurPeople",
  component: MeetOurPeople,
};

const Template = (args) => <MeetOurPeople {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
