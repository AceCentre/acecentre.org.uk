import { Pagination } from "./pagination";

export default {
  title: "Resources/Pagination",
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Standard = Template.bind({});
Standard.args = { currentPage: 2, pageCount: 10 };

export const FirstPage = Template.bind({});
FirstPage.args = { currentPage: 1, pageCount: 10 };

export const LastPage = Template.bind({});
LastPage.args = { currentPage: 10, pageCount: 10 };
