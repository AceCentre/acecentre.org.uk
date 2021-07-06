import { ContactCards } from "./contact-cards";

export default {
  title: "/Contact/Cards",
  component: ContactCards,
};

const Template = (args) => <ContactCards {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
