import { Pagination } from "./pagination";

export default {
  title: "Resources/Pagination",
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Standard = Template.bind({});
Standard.args = { currentPage: 2, pageCount: 10 };
