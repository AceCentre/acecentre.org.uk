import { AllStories } from "./all-stories";
import { STORIES_DEMO } from "./all-stories-demo";

export default {
  title: "Stories/AllStories",
  component: AllStories,
};

const Template = (args) => <AllStories {...args} />;

export const Standard = Template.bind({});
Standard.args = { stories: STORIES_DEMO };
