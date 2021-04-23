import { getAllStaff } from "../../lib/staff/get-staff";
import Link from "next/link";
import styles from "../../styles/staff.module.css";
import { Image } from "../../components/image";

export default function AllStaffPage({ allStaff }) {
  return (
    <>
      <header>
        <p>
          Imagine this is a nice landing page and all these bullet points are
          fancy cards. The bullet points are clickable
        </p>
      </header>
      <main>
        <ul>
          {allStaff.map((employee) => (
            <li key={employee.slug} className={styles.listItem}>
              {employee.image && (
                <Image
                  {...employee.image}
                  maxWidth={100}
                  alt={`A head shot of ${employee.name}`}
                />
              )}
              <Link href={`/staff/${employee.slug}`}>{employee.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allStaff = await getAllStaff();

  return { props: { allStaff } };
}
