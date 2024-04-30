import Link from "next/link";
import styles from "./language-library-how-to.module.css";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

export const LanguageLibraryHowTo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h2>How to add to the AAC Language Library</h2>
        <p>
          The AAC Language Library is open for anyone to contribute to. The
          resources are moderated by a team of editors to ensure a high quality
          is maintained. If you would like to add a new resource click the link
          below or watch the instructional video.
        </p>
        <Link href="http://language-library.acecentre.org.uk/">
          Contribute to the AAC Language Library &gt;
        </Link>
      </div>
      <div className={styles.youtubePlayer}>
        <LiteYouTubeEmbed
          id={"UKewXPsCW5Y"}
          title="A youtube video about how to contribute to the AAC language library"
          noCookie={true}
        />
      </div>
    </div>
  );
};
