import { getAllStaff } from "../../lib/staff/get-staff";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/staff.module.css";

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
                <div className={styles.image}>
                  <Image
                    {...employee.image}
                    alt={`A head shot of ${employee.name}`}
                  />
                </div>
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
