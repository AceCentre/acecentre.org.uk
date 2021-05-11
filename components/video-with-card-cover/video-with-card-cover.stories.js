import { VideoWithCardCover } from "./video-with-card-cover";

export default {
  title: "Components/VideoWithCardCover",
  component: VideoWithCardCover,
};

const Template = (args) => (
  <VideoWithCardCover {...args}>
    <h1>Test</h1>
    <p>Paragraph</p>
  </VideoWithCardCover>
);

export const Standard = Template.bind({});
Standard.args = {};
