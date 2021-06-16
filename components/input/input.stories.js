import { Input } from "./input";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";

export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const SearchInput = Template.bind({});

SearchInput.args = {
  placeholder: "Search",
  maxWidth: 213,
  children: (
    <SvgIcon>
      <SearchIcon />
    </SvgIcon>
  ),
};
