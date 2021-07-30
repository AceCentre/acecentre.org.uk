import { WhatMoneyCanDo } from "./what-money-can-do";

export default {
  title: "/GetInvolved/WhatMoneyCanDo",
  component: WhatMoneyCanDo,
};

const Template = (args) => <WhatMoneyCanDo {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
