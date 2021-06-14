import { Input } from "./input";

export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
