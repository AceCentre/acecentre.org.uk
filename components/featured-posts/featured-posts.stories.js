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
