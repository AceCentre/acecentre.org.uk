import { Image } from "../../components/image";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { getAllStaff, getEmployee } from "../../lib/staff/get-staff";

export default function EmployeePage({ employee }) {
  return (
    <>
      <header>
        <Nav />
        <SubNav navItems={defaultNavItems} />
      </header>

      <main>
        {employee.image && (
          <Image
            {...employee.image}
            maxWidth={100}
            alt={`A head shot of ${employee.name}`}
          />
        )}
        <pre>{JSON.stringify(employee, null, 2)}</pre>
      </main>
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
