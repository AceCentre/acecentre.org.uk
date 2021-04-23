import styles from "../../styles/staff.module.css";
import { getAllTrustees } from "../../lib/trustees/get-trustees";
import Image from "next/image";

export default function AllTrusteesPage({ allTrustees }) {
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
          {allTrustees.map((trustee) => (
            <li key={trustee.slug} className={styles.listItem}>
              {trustee.imageUrl && (
                <Image src={trustee.imageUrl} width={40} height={40} />
              )}
              <pre>{JSON.stringify(trustee, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allTrustees = await getAllTrustees();

  return { props: { allTrustees } };
}
