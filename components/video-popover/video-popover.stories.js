import { VideoPopover } from "./video-popover";

export default {
  title: "Components/VideoPopover",
  component: VideoPopover,
};

const Template = (args) => <VideoPopover {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
