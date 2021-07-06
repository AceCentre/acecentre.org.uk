import { ResourcesTicks } from "./resources-ticks";

export default {
  title: "/Resources/Ticks",
  component: ResourcesTicks,
};

const Template = (args) => <ResourcesTicks {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
