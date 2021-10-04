import { useState } from "react";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import {
  FilterPeople,
  OPTIONS,
} from "../../components/filter-people/filter-people";
import { Footer } from "../../components/footer/footer";
import { MeetOurPeople } from "../../components/meet-our-people/meet-our-people";
import { PageTitle } from "../../components/page-title/page-title";
import { StaffList } from "../../components/staff-list/staff-list";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStaff } from "../../lib/staff/get-staff";

export default function StaffPage({ allStaff }) {
  const { currentYear } = useGlobalProps();
  const [currentFilter, setCurrentFilter] = useState(OPTIONS.ALL);
  const filteredStaff = allStaff.filter(staffFilters[currentFilter]);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="Our team"
          description="Our team is our greatest strength"
        />
        <MeetOurPeople />
        <FilterPeople onChange={setCurrentFilter} />
        <StaffList staffList={filteredStaff} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStaff = await getAllStaff();

  return {
    props: {
      allStaff,
      seo: {
        title: "Our Team",
        description:
          "Ace Centre is a multi-disciplinary team of specialist teachers, occupational therapists, speech & language therapists with the support of technical and administrative staff.",
      },
    },
  };
});

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
