import { UncaughtError } from "./uncaught-error";

export default {
  title: "UncaughtError",
  component: UncaughtError,
};

const Template = (args) => <UncaughtError {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
