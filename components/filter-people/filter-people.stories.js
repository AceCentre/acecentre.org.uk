import { FilterPeople } from "./filter-people";

export default {
  title: "About/Staff/FilterPeople",
  component: FilterPeople,
};

const Template = (args) => <FilterPeople {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
