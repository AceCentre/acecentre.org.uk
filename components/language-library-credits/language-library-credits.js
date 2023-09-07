import { Image } from "../image";
import styles from "./language-library-credits.module.css";

export const LanguageLibraryCredits = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2>Build and managed by Ace Centre</h2>
        <p>In collaboration with:</p>

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
        </div>
      </div>
    </div>
  );
};
