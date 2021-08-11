import { ResetPasswordForm } from "./reset-password-form";

export default {
  title: "ResetPasswordForm",
  component: ResetPasswordForm,
};

const Template = (args) => <ResetPasswordForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
