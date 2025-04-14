import { useState } from "react";
import { FilterPeople, OPTIONS } from "../filter-people/filter-people";
import { MeetOurPeople } from "../meet-our-people/meet-our-people";
import { PageTitle } from "../page-title/page-title";
import { StaffList } from "../staff-list/staff-list";

export const StaffPage = ({ allStaff, currentActive }) => {
  const [currentFilter, setCurrentFilter] = useState(OPTIONS.ALL);
  const filteredStaff = allStaff.filter(staffFilters[currentFilter]);

  return (
    <>
      <PageTitle
        heading="Our team"
        description="Our team is our greatest strength"
      />
      {/* <MeetOurPeople /> teporarily hiding this component */}
      <FilterPeople onChange={setCurrentFilter} />
      <StaffList staffList={filteredStaff} currentActive={currentActive} />
    </>
  );
};

const staffFilters = {
  // Everyone is always included in all
  [OPTIONS.ALL]: () => {
    return true;
  },

  // Only staff members within the leadership team group
  [OPTIONS.LEADERSHIP]: (currentStaff) => {
    return currentStaff.groups.includes("Leadership Team");
  },

  // Only staff members with the location set to Oldham
  [OPTIONS.NORTH]: (currentStaff) => {
    const location = currentStaff.location;
    return location === "Oldham";
  },

  // Only staff members with the location set to Abingdon
  [OPTIONS.SOUTH]: (currentStaff) => {
    const location = currentStaff.location;
    return location === "Abingdon";
  },
};
