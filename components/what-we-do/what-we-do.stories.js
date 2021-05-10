import { WhatWeDo } from "./what-we-do";

export default {
  title: "Home/WhatWeDo",
  component: WhatWeDo,
};

const Template = (args) => <WhatWeDo {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
