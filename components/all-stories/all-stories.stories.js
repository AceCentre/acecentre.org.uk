import { AllStories } from "./all-stories";

export default {
  title: "Stories/AllStories",
  component: AllStories,
};

const Template = (args) => <AllStories {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
