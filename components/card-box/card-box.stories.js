import { CardBox } from "./card-box";

export default {
  title: "card-box",
  component: CardBox,
};

const Template = (args) => <CardBox {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
