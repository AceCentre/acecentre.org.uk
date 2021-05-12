import { TrusteeList } from "./trustee-list";
import { TRUSTEE_LIST_DEMO } from "./trustee-list-demo";

export default {
  title: "About/Trustees/TrusteeList",
  component: TrusteeList,
};

const Template = (args) => <TrusteeList {...args} />;

export const Standard = Template.bind({});
Standard.args = { trusteeList: TRUSTEE_LIST_DEMO };
