import { SearchBox } from "./search-box";

export default {
  title: "Components/SearchBox",
  component: SearchBox,
};

const Template = (args) => <SearchBox {...args} />;

export const BlogSearch = Template.bind({});
BlogSearch.args = {
  title: "Blog",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
  pellentesque.`,
  searchEndpoint: "/blog/search",
  ariaLabel: "Search blog posts",
  placeholder: "What are you looking for?",
  searchButtonText: "Search",
};
