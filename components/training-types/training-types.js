import Link from "next/link";
import styles from "./training-types.module.css";

export const TrainingTypes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h2>Bespoke training</h2>
          <p>
            Our expert Ace Centre team can help to create a bespoke training
            solution for you. Click below to fill out our training enquiry form
            to see how we can develop a suitable training programme for your
            requirements.
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
            This should be some text about why live courses are great.This
            should be some text about why live courses are great.This should be
            some text about why live courses are great.This should be some text
            about why live courses.
          </p>
          <Link href="/learning/search?type=live">View live courses &gt;</Link>
        </div>
        <div>
          <h2>On-demand</h2>
          <p>
            This should be some text about on-demand courses and why we do them.
            This should be some text about on-demand courses and why we do
            them.This should be some text about on-demand courses.
          </p>
          <Link href="/learning/search?type=on-demand">
            View on-demand courses &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};
