import { DocsSidebar } from "./docs-sidebar";

export default {
  title: "Documentation/Sidebar",
  component: DocsSidebar,
};

const Template = (args) => <DocsSidebar {...args} />;

export const Flat = Template.bind({});
Flat.args = {
  activeLink: "#four",
  topLevel: [
    { title: "First Level", link: "#first-level" },
    { title: "Next Level", link: "#next-level" },
    { title: "Two Level", link: "#two-level" },
    { title: "Three Level", link: "#three-level" },
    { title: "Four", link: "#four" },
    { title: "Last Level", link: "#last-level" },
  ],
};

export const MultiLevelInactive = Template.bind({});
MultiLevelInactive.args = {
  activeLink: "#four",
  topLevel: [
    {
      title: "First Level",
      link: "#first-level",
      sub: [
        {
          title: "First Level",
          link: "#deep-level",
        },
      ],
    },
    { title: "Next Level", link: "#next-level" },
    { title: "Two Level", link: "#two-level" },
    { title: "Three Level", link: "#three-level" },
    { title: "Four", link: "#four" },
    { title: "Last Level", link: "#last-level" },
  ],
};

export const MultiLevelActive = Template.bind({});
MultiLevelActive.args = {
  activeLink: "#first-level",
  topLevel: [
    {
      title: "First Level",
      link: "#first-level",
      sub: [
        {
          title: "First Level",
          link: "#deep-level",
        },
      ],
    },
    { title: "Next Level", link: "#next-level" },
    { title: "Two Level", link: "#two-level" },
    { title: "Three Level", link: "#three-level" },
    { title: "Four", link: "#four" },
    { title: "Last Level", link: "#last-level" },
  ],
};

export const SubPageActive = Template.bind({});
SubPageActive.args = {
  activeLink: "#deep-level",
  topLevel: [
    {
      title: "First Level",
      link: "#first-level",
      sub: [
        {
          title: "First Level",
          link: "#deep-level",
        },
        {
          title: "Second Level",
          link: "#even-level",
        },
        {
          title: "Third Level",
          link: "#more-level",
        },
        {
          title: "Fourth Level",
          link: "#lets-level",
        },
        {
          title: "Fifth Level",
          link: "#go-level",
        },
      ],
    },
    { title: "Next Level", link: "#next-level" },
    { title: "Two Level", link: "#two-level" },
    { title: "Three Level", link: "#three-level" },
    { title: "Four", link: "#four" },
    { title: "Last Level", link: "#last-level" },
  ],
};
