import { getAllStaff } from "../../lib/staff/get-staff";
import Link from "next/link";

export default function AllStaffPage({ allStaff }) {
  return (
    <>
      <p>
        Imagine this is a nice landing page and all these bullet points are
        fancy cards. The bullet points are clickable
      </p>
      <ul>
        {/* TODO: make this a next link  */}
        {allStaff.map((employee) => (
          <li key={employee.slug}>
            <Link href={`/staff/${employee.slug}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const allStaff = await getAllStaff();

  return { props: { allStaff } };
}
