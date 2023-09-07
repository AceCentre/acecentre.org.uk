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
              src="./collaboration.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div>
          <h2>Global</h2>
          <p>
            We highlight diverse perspectives and experiences of AAC users and
            professionals from different corners of the globe. Explore this
            section to discover how AAC is making a global difference,
          </p>
          <div className={styles.imageContainer}>
            <Image src="./global.png" layout="fill" objectFit="contain" />
          </div>
        </div>

        <div>
          <h2>Multilingual</h2>
          <p>
            We understand that communication is not limited to a single tongue,
            and this section provides resources, tools, and guidance for
            individuals who use AAC in different languages.
          </p>
          <div className={styles.imageContainer}>
            <Image src="./multilingual.png" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </div>
  );
};
