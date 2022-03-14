import styles from "./description-and-quote.module.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Avatar from "@material-ui/core/Avatar";

export const DescriptionAndQuote = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          <strong>Ace Centre</strong> is a registered charity (No. 1089313)
          providing Assistive Technology and Augmentative and Alternative
          Communication services for people with complex needs. We offer
          assessment, training and information services across England, with a
          focus on Augmentative and Alternative Communication (AAC) and
          Assistive Technology (AT), delivered by our multi-disciplinary team of
          specialist teachers, occupational therapists, speech & language
          therapists with the support of technical and administrative staff.
        </p>
        <p>
          We believe everyone should be given the opportunity and the tools they
          need to fulfil their potential; we therefore lobby for change in
          statutory policy as well as working directly with people who need our
          support.
        </p>
      </div>
      <div className={styles.quote}>
        <Avatar className={styles.avatar}>
          <FormatQuoteIcon className={styles.icon} />
        </Avatar>
        <div className={styles.quoteText}>
          <p className={styles.quoteContent}>
            &quot;The help Ace Centre gave me throughout my education kept me
            motivated and enabled me to get into the place I most wanted to
            study, Imperial College London.&quot;
          </p>
          <div>
            <p>
              <strong>Claire</strong>
            </p>
            <p>Physics Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};
