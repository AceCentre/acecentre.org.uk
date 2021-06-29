import { BackToLink } from "./back-to-link";

export default {
  title: "/About/BackToLink",
  component: BackToLink,
};

const Template = (args) => <BackToLink {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
