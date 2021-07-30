import { DashboardCard } from "./dashboard-card";

export default {
  title: "/MyAceCentre/DashboardCard",
  component: DashboardCard,
};

const Template = (args) => <DashboardCard {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
