import { Image } from "../image";
import styles from "./language-library-subtitles.module.css";

export const LanguageLibrarySubtitles = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div>
          <h2>Collaboration</h2>
          <p>
            Collaboration is at the heart of our AAC language library. We
            believe that by working together, we can create a more inclusive and
            accessible world for individuals who use AAC.
          </p>
          <div className={styles.imageContainer}>
            <Image
              src="/collaboration.png"
              layout="fill"
              objectFit="contain"
              alt="Icon of three people in a circle"
            />
          </div>
        </div>

        <div>
          <h2>Equity</h2>
          <p>
            We recognise that AAC users have various language needs and we
            believe that they should have the right resources to effectively
            communicate.
          </p>
          <div className={styles.imageContainer}>
            <Image
              src="/equity.png"
              layout="fill"
              objectFit="contain"
              alt="Icon of scales with a person on each side"
            />
          </div>
        </div>

        <div>
          <h2>Discover</h2>
          <p>
            We know how hard it is as professionals to find resources in a
            language you don&apos;t speak. The library makes this easier, giving
            you more time to focus on supporting AAC users.
          </p>
          <div className={styles.imageContainer}>
            <Image
              src="/discover.png"
              layout="fill"
              objectFit="contain"
              alt="Icon of a magnifying glass"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
