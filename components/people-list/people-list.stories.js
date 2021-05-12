import { Image } from "../image";
import { STAFF_LIST_DEMO } from "../staff-list/static-staff-list";
import { PeopleList } from "./people-list";

export default {
  title: "Components/PeopleList",
  component: PeopleList,
};

const Template = (args) => <PeopleList {...args} />;

const StaffCard = ({ person }) => {
  const staffMember = person;

  return (
    <>
      <Image
        alt={`Head shot of ${staffMember.name}`}
        {...staffMember.image}
        maxWidth={200}
      />
      <p>{staffMember.name}</p>
      <p>{staffMember.role.trim()}</p>
      <p>{staffMember.location.trim()}</p>
    </>
  );
};

export const StaffExample = Template.bind({});
StaffExample.args = {
  peopleList: STAFF_LIST_DEMO,
  renderCardContent: StaffCard,
};
