import { LoginAndRegisterBoxes } from "./login-and-register-boxes";

export default {
  title: "/General/LoginAndRegisterBoxes",
  component: LoginAndRegisterBoxes,
};

const Template = (args) => <LoginAndRegisterBoxes {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
