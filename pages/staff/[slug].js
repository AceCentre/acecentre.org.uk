import { getAllStaff, getEmployee } from "../../lib/staff/get-staff";
import Image from "next/image";
import styles from "../../styles/staff.module.css";

export default function EmployeePage({ employee }) {
  return (
    <>
      {employee.image && (
        <div className={styles.image}>
          <Image {...employee.image} alt={`A head shot of ${employee.name}`} />
        </div>
      )}
      <pre>{JSON.stringify(employee, null, 2)}</pre>
    </>
  );
}

export async function getStaticPaths() {
  const allStaff = await getAllStaff();
  const paths = allStaff.map((employee) => ({
    params: { slug: employee.slug },
  }));

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const employee = await getEmployee(params.slug);

  return {
    props: {
      employee,
    },
  };
}
