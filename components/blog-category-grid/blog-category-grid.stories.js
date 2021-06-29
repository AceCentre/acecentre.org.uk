import { BlogCategoryGrid } from "./blog-category-grid";

export default {
  title: "Blog/BlogCategoryGrid",
  component: BlogCategoryGrid,
};

const Template = (args) => <BlogCategoryGrid {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  blogCategories: [
    {
      slug: "fundraising",
      title: "Fundraising",
      featuredImage: {
        src:
          "https://internal.acecentre.org.uk/wp-content/uploads/2017/08/Runners_in_Manchester_2016_event.jpg",
        height: 680,
        width: 1024,
        alt: "Great Manchester Run 2016",
      },
    },
    {
      slug: "general",
      title: "General",
      featuredImage: {
        src:
          "https://internal.acecentre.org.uk/wp-content/uploads/2021/06/IMG_6860.jpeg",
        height: 667,
        width: 1000,
        alt: "Two staff members using a communication device",
      },
    },
    {
      slug: "partnerships",
      title: "Partnerships",
      featuredImage: {
        src:
          "https://internal.acecentre.org.uk/wp-content/uploads/2021/06/WW89518-scaled.jpeg",
        height: 1709,
        width: 2560,
        alt: "Everyone at Ace Centre standing around a room",
      },
    },
    {
      slug: "research",
      title: "Research",
      featuredImage: {
        src:
          "https://internal.acecentre.org.uk/wp-content/uploads/2021/06/IMG_6928-scaled.jpeg",
        height: 1632,
        width: 2560,
        alt: "Ace centre staff member creating a product",
      },
    },
  ],
};
