import { GettingStartedGrid } from "./getting-started-grid";

export default {
  title: "/GettingStarted/Grid",
  component: GettingStartedGrid,
};

const Template = (args) => <GettingStartedGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
