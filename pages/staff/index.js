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
              {employee.imageUrl && (
                <Image
                  alt={`A head shot of ${employee.name}`}
                  src={employee.imageUrl}
                  width={40}
                  height={40}
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
