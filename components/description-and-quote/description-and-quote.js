import styles from "./description-and-quote.module.css";

export const DescriptionAndQuote = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Ace Centre is a registered charity (No. 1089313) providing support for
          people with complex communications difficulties. We offer assessment,
          training and information services across England, with a focus on
          Augmentative and Alternative Communication (AAC) and Assistive
          Technology (AT), delivered by our multi-disciplinary team of
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
      <div>
        <p>
          &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque gravida rutrum mattis. Aenean tincidunt neque id turpis
          viverra pellentesque.&quot;
        </p>
        <p>- Anna Reeves DL CEO</p>
      </div>
    </div>
  );
};
