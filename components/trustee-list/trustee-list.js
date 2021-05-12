import { Image } from "../image";
import { PeopleList } from "../people-list/people-list";

export const TrusteeList = ({ trusteeList }) => {
  return (
    <PeopleList peopleList={trusteeList} renderCardContent={TrusteeCard} />
  );
};

const TrusteeCard = ({ person }) => {
  return (
    <>
      {person.image && (
        <Image
          alt={`Head shot of ${person.name}`}
          {...person.image}
          maxWidth={200}
        />
      )}
      <p>{person.name}</p>
      {person.role && <p>{person.role.trim()}</p>}
    </>
  );
};
