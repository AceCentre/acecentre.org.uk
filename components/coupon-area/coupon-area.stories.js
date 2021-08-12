import { CouponArea } from "./coupon-area";

export default {
  title: "CouponArea",
  component: CouponArea,
};

const Template = (args) => <CouponArea {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
