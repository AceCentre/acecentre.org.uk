import { ProjectsSearch } from "./projects-search";

export default {
  title: "Projects/Search",
  component: ProjectsSearch,
};

const Template = (args) => <ProjectsSearch {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
