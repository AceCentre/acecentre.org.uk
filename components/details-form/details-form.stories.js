import { DetailsForm } from "./details-form";

export default {
  title: "DetailsForm",
  component: DetailsForm,
};

const Template = (args) => <DetailsForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
