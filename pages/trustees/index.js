import styles from "../../styles/staff.module.css";
import { getAllTrustees } from "../../lib/trustees/get-trustees";
import { Image } from "../../components/image";

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
              {trustee.image && (
                <Image
                  {...trustee.image}
                  maxWidth={100}
                  alt={`Head shot of ${trustee.name}`}
                />
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
