import Link from "next/link";
import styles from "./get-involved.module.css";
import Image from "next/image";
import { Button } from "../button/button";

export const GetInvolved = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.backgroundImage}
        src="/collage.png"
        objectFit="cover"
        layout="fill"
      />
      <div className={styles.blueCover}></div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.title}>How to get involved</h2>
          <p className={styles.handwriting}>Make a difference</p>
          <p className={styles.paragraph}>
            Your support is vital to our ongoing work to ensure that children
            and adults with the most challenging communication difficulties.
          </p>
          <div className={styles.buttonContainer}>
            <Button href="/get-involved">Ways to get involved</Button>
            <Link href="/donation">
              <a className={styles.donationLink}>Make a donation</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// return (
//   <div className={styles.container}>
//     <div className={styles.innerContainer}>
//       <h1>Get involved</h1>
//       <p>
//         Your support is vital to our ongoing work to ensure that children and
//         adults with the most challenging communication difficulties have free
//         access to the advice, information and support they need to fulfil
//         their potential
//       </p>
//       <div className={styles.buttonContainer}>
//         <div className={styles.getInvolved}>
//           <Link href="/get-involved">Ways to get involved</Link>
//         </div>
//         <Link href="/donate">Make a donation</Link>
//       </div>
//     </div>
