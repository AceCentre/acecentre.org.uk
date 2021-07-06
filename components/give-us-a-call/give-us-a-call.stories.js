import { GiveUsACall } from "./give-us-a-call";

export default {
  title: "/Contact/GiveUsACall",
  component: GiveUsACall,
};

const Template = (args) => <GiveUsACall {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
