import { ProjectHighlight } from "./project-highlight";

export default {
  title: "/Resources/ProjectHighlight",
  component: ProjectHighlight,
};

const Template = (args) => <ProjectHighlight {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
