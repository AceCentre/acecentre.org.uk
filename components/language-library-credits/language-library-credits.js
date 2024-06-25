import { Image } from "../image";
import styles from "./language-library-credits.module.css";

export const LanguageLibraryCredits = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div>
          <h2>Built and managed by</h2>
          <div className={styles.logoImageContainer}>
            <Image
              layout="fill"
              objectFit="contain"
              src={"/nav-logo.png"}
              alt="The Ace Centre logo"
            ></Image>
          </div>
        </div>

        <div className={styles.logoContainer}>
          <div className={styles.imageContainer}>
            <Image
              src="/lincoln.png"
              layout="fill"
              objectFit="contain"
              alt="'NHS Lincolnshire Community Health Services, NHS Trust'"
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/barnsley.png"
              layout="fill"
              objectFit="contain"
              alt="'NHS Barnsley Hospital, NHS Foundation Trust'"
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/rhnd.png"
              layout="fill"
              objectFit="contain"
              alt="'Royal Hospital for Neuro-disability'"
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/cumbria.png"
              layout="fill"
              objectFit="contain"
              alt="'NHS Cumbria, Northumberland, Tyne and Wear, NHS Foundation Trust'"
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/NorthBristol.png"
              layout="fill"
              objectFit="contain"
              alt="'North Bristol NHS Trust'"
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/central-london-community-healthcare.png"
              layout="fill"
              objectFit="contain"
              alt="'Central London Community Healthcare'"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
