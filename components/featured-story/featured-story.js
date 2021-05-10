import styles from "./featured-story.module.css";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import Link from "next/link";

export const FeaturedStory = ({ youtubeVideo, summary, title, slug }) => {
  const videoId = urlToVideoId(youtubeVideo);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <LiteYouTubeEmbed
          id={videoId}
          title={`A youtube video about: ${title}`}
          noCookie={true}
        />
      </div>
      <div>
        <h1>{title}</h1>
        {/* We are dangerously setting inner HTML here because the summary comes from wordpress */}
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
        <div className={styles.buttonContainer}>
          <div className={styles.findOutMore}>
            <Link href={`/stories/${slug}`}>Full story</Link>
          </div>
          <Link href="/stories">Read more stories</Link>
        </div>
      </div>
    </div>
  );
};

const urlToVideoId = (url) => {
  return new URL(url).searchParams.get("v");
};
