import { Form } from "./form";

export default {
  title: "/Form/Form",
  component: Form,
};

const Template = (args) => <Form {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
