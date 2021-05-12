import { Image } from "../image";
import { PeopleList } from "../people-list/people-list";

export const StaffList = ({ staffList }) => {
  return <PeopleList peopleList={staffList} renderCardContent={StaffCard} />;
};

const StaffCard = ({ person }) => {
  return (
    <>
      <Image
        alt={`Head shot of ${person.name}`}
        {...person.image}
        maxWidth={200}
      />
      <p>{person.name}</p>
      <p>{person.role.trim()}</p>
      <p>{person.location.trim()}</p>
    </>
  );
};
