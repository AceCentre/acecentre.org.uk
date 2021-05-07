import { VideoWithCardCover } from "./video-with-card-cover";

export default {
  title: "Home/VideoWithCardCover",
  component: VideoWithCardCover,
};

const Template = (args) => <VideoWithCardCover {...args} />;

export const Standard = Template.bind({});
Standard.args = {};
