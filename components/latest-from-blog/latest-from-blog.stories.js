import { LatestFromBlog } from "./latest-from-blog";

export default {
  title: "Home/LatestFromBlog",
  component: LatestFromBlog,
};

const Template = (args) => <LatestFromBlog {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  posts: [
    {
      slug: "covid-19-update-clients-at-the-centre-of-our-covid-19-strategy",
      title: "Clients at the centre of our COVID-19 strategy",
      featuredImage: null,
    },
    {
      slug: "ace-centre-covid-19-position-statement",
      title: "Ace Centre COVID-19 Position Statement",
      featuredImage: {
        src:
          "https://internal.acecentre.org.uk/wp-content/uploads/2020/03/remote-work-tips.png",
        height: 255,
        width: 255,
      },
    },
    {
      slug:
        "covid-19-update-communication-works-north-and-south-events-postponed",
      title: "Communication Works North and South events postponed",
      featuredImage: null,
    },
  ],
};
