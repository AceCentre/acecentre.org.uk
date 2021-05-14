import { FeaturedPosts } from "./featured-posts";

export default {
  title: "Components/FeaturedPosts",
  component: FeaturedPosts,
};

const Template = (args) => <FeaturedPosts {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  title: "Latest from the blog",
  viewAllLink: "/blog",
  posts: [
    {
      title: "Ace Centre Festive opening times Christmas and New Year 2020",
      slug: "ace-centre-festive-opening-times-christmas-and-new-year-2020",
      featuredImage: null,
    },
    {
      title: "COVID-19 Update – clients at the centre of our COVID-19 strategy",
      slug: "covid-19-update-clients-at-the-centre-of-our-covid-19-strategy",
      featuredImage: null,
    },
    {
      title: "Ace Centre COVID-19 Position Statement",
      slug: "ace-centre-covid-19-position-statement",
      featuredImage: null,
    },
  ],
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  posts: [
    {
      title: "Ace Centre Festive opening times Christmas and New Year 2020",
      slug: "ace-centre-festive-opening-times-christmas-and-new-year-2020",
      featuredImage: null,
    },
    {
      title: "COVID-19 Update – clients at the centre of our COVID-19 strategy",
      slug: "covid-19-update-clients-at-the-centre-of-our-covid-19-strategy",
      featuredImage: null,
    },
    {
      title: "Ace Centre COVID-19 Position Statement",
      slug: "ace-centre-covid-19-position-statement",
      featuredImage: null,
    },
  ],
};

export const SixPosts = Template.bind({});
SixPosts.args = {
  posts: [
    {
      slug: "ace-centre-festive-opening-times-christmas-and-new-year-2020",
      title: "Ace Centre Festive opening times Christmas and New Year 2020",
      featuredImage: null,
    },
    {
      slug: "covid-19-update-clients-at-the-centre-of-our-covid-19-strategy",
      title: "COVID-19 Update – clients at the centre of our COVID-19 strategy",
      featuredImage: null,
    },
    {
      slug: "ace-centre-covid-19-position-statement",
      title: "Ace Centre COVID-19 Position Statement",
      featuredImage: null,
    },
    {
      slug:
        "covid-19-update-communication-works-north-and-south-events-postponed",
      title:
        "COVID-19 update: Communication Works North and South events postponed",
      featuredImage: null,
    },
    {
      slug: "remote-working",
      title:
        "Remote working during COVID-19;  Tips and strategies for AAC professionals",
      featuredImage: null,
    },
    {
      slug: "register-for-communication-works-2020",
      title: "Register for Communication Works 2020",
      featuredImage: null,
    },
  ],
};
