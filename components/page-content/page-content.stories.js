import { PageContent } from "./page-content";

export default {
  title: "PageContent",
  component: PageContent,
};

const Template = (args) => <PageContent {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
