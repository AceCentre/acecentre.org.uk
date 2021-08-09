import { Table } from "./table";

export default {
  title: "/General/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
