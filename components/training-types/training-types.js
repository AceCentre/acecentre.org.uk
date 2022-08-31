import Link from "next/link";
import styles from "./training-types.module.css";

export const TrainingTypes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h2>Bespoke training</h2>
          <p>
            Our expert and experienced Ace Centre team will create a bespoke
            package tailored to your needs, with agreed Learning Outcomes, to
            enhance knowledge and skills on the use of Assistive Technology and
            Augmentative and Alternative Communication.
          </p>
          <Link href="/learning/bespoke-training">
            Enquire about bespoke training &gt;
          </Link>
          <p>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </div>
        <div>
          <h2>Live</h2>
          <p>
            Delivered online or on location, our live sessions delivered by
            practitioners with first-hand experience are an engaging mix of
            theory and practical, with an emphasis on developing skills and
            confidence.
          </p>
          <Link href="/learning/search?type=live">View live courses &gt;</Link>
        </div>
        <div>
          <h2>On-demand</h2>
          <p>
            A range of courses with dynamic content that is provided through our
            online learning platform designed for professionals, carers and
            families to complete in their own time at their own pace.
          </p>
          <Link href="/learning/search?type=on-demand">
            View on-demand courses &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};
