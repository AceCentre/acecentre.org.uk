import { useState } from "react";
import { CareersAtAce } from "../../components/careers-at-ace/careers-at-ace";
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
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStaff } from "../../lib/staff/get-staff";

export default function StaffPage({ allStaff }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();
  const [currentFilter, setCurrentFilter] = useState(OPTIONS.ALL);
  const filteredStaff = allStaff.filter(staffFilters[currentFilter]);

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Our team"
          description="Our team is our greatest strength"
        />
        <MeetOurPeople />
        <FilterPeople onChange={setCurrentFilter} />
        <StaffList staffList={filteredStaff} />
        <CareersAtAce />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStaff = await getAllStaff();

  return { props: { allStaff } };
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
