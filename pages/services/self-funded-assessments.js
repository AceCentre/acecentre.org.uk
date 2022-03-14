import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import Avatar from "@material-ui/core/Avatar";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/self-funded-assessments.module.css";
import { InformationDays } from "../../components/information-days/information-days";
import Link from "next/link";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function EngineeringPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/self-funded-assessments.jpg"
          alt="An Ace Centre staff member showing a client how to use their device"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Self-funded assessments</h1>
          <p className={styles.cardDescription}>
            Working with the individual, family and involved professionals to
            identify and achieve goals to support the development of
            communication, learning, and greater independence.
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Make an online enquiry</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Self-funded assessments</h2>
            <p>
              Before you start this process we do encourage you to make contact
              with your local AAC team for support. If you are unsure how to
              access your local AAC team, please ring our free telephone advice
              line on 0800 080 3115 and we will try to help you to identify an
              appropriate contact point in your area.
            </p>
            <p>
              If you plan to go with an Ace Centre self-funded assessment
              service we recommend you attend a free one-hour information
              appointment. These appointments are a useful first step in any
              effective assessment process.
            </p>
            <p>
              We offer independent interdisciplinary assessments to identify
              appropriate assistive technology resources for people with
              physical and/or communication impairments to support their
              communication and learning.
            </p>
            <p>
              We recognise the benefits of a partnership approach when
              completing assessments. Very few people manage effectively in
              isolation, and we encourage individuals, their families and
              involved professionals to work together as a team – from the very
              first step of identifying a need, through to the ongoing review
              and provision of support needed for each individual to achieve
              their long-term goals.
            </p>
            <p>
              If significant others are not involved in the assessment process,
              this can lead to problems such as a lack of funding, inappropriate
              recommendations for equipment, training and support, and/or a
              failure in implementation. The end result is that the intervention
              does not succeed, and the individual is unable to move forward.
            </p>
            <p>
              For these reasons, Ace Centre likes the ‘team’ to be identified
              from the beginning of the process: Our main objective is to
              facilitate closer working with the team to identify and achieve
              common and realistic goals.
            </p>
            <p>
              Our assessment and training teams consist of Occupational
              Therapists, Speech and Language Therapists, Teachers and
              Technicians.
            </p>
            <h2>The referral form</h2>
            <p>
              A completed referral form is required in support of any assessment
              requested. The referral form is available:
            </p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/docs/ReferralFormWord.doc">In Word format</Link>
              </li>
              <li>
                <Link href="/docs/ReferralFormPdf.pdf">In PDF format</Link>
              </li>
              <li>On request from our telephone helpline (0800 080 3115)</li>
              <li>On request by email to: enquiries@acecentre.org.uk</li>
            </ul>
            <p>
              The referral form should be completed in as much detail as
              possible to support the assessment and training team in planning
              and preparing for the assessment. It may help if the individual
              and all those who support him/her meet together to discuss the
              aims of the assessment prior to completing the referral.
            </p>
            <h2>Video support</h2>
            <p>
              A recent video of the individual is requested to support the
              referral. This will help the assessment and training team in
              planning for the assessment and determining what equipment may be
              required.
            </p>
            <p>Ideally, the video should aim to show the individual:</p>
            <ul>
              <li>
                Interacting and communicating with others (showing any resources
                they use)
              </li>
              <li>Accessing a computer or other technology</li>
              <li>
                Completing activities that demonstrate the physical movements
                they are capable of
              </li>
              <li>In the typical range of positions they work in</li>
            </ul>
            <h2>Prior to the assessment</h2>
            <p>
              A service delivery meeting is held once a month to discuss and
              allocate any received referrals. Once your completed referral form
              is received it will be discussed at the next scheduled service
              delivery meeting and 2 members of the assessment and training team
              will be allocated to complete the assessment. They will then make
              the necessary arrangements for the assessment and confirm this in
              writing to those people identified on the referral form.
            </p>
            <h2>Who should be involved?</h2>
            <p>
              Ace Centre recognises the benefits of a partnership approach when
              completing assessments. The individual, family members and any
              professionals identified on the referral form will be invited to
              the assessment unless otherwise stated. This may include the local
              Speech and Language Therapist, Occupational Therapist, Teacher
              and/or Support Worker depending upon the individual’s needs.
            </p>
            <h2>The venue</h2>
            <p>
              Assessments are typically completed in an environment familiar to
              the individual. This may be the person’s home, school/college, day
              centre or work place.
            </p>
            <h2>Length of assessment</h2>
            <p>
              The length of time required for the assessment will vary but
              typically takes place over the course of a day. On some occasions
              it may be necessary to make a second visit and this will be
              included in the initial cost. The timings for the assessment will
              be agreed with the referrer initially and subject to modification
              as necessary dependent on individual needs.
            </p>
            <h2>What happens at the assessment?</h2>
            <p>
              Two members of the assessment and training team will facilitate
              the assessment. The session will typically commence with a general
              discussion with everyone concerned providing an opportunity to
              share any relevant information and identify aims and expectations.
            </p>
            <p>
              During the assessment the individual will have an opportunity to
              demonstrate any resources they are currently using and they will
              be supported in trying out alternative resources and strategies
              that might be suitable. It may be necessary to work for short
              periods, with breaks to set up different equipment and work within
              the individuals levels of attention motivation and stamina.
            </p>
            <p>
              At the end of the assessment it is useful if the group meet
              together again to discuss the assessment and consider potential
              recommendations and reach shared conclusions and appropriate
              solutions.
            </p>
            <h2>Following the assessment</h2>
            <p>
              Arrangements will be made for the loan of any recommended
              equipment to allow a period of further evaluation. Following this
              a comprehensive report will be compiled and sent to all those
              involved in the assessment. The report will summarise the
              assessment, outline conclusions reached and provide
              recommendations. The report will also include details of any
              software or hardware recommended with prices / suppliers and
              follow up action and/or training recommendations as appropriate.
            </p>
            <p>
              Please Note: Ace Centre do not supply equipment. Once equipment
              recommendations have been made following assessment, it is the
              responsibility of the individual and those providing support to
              seek funding for the equipment and order it.
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;It helps to have specialist input from teams like yours
                  to steer us in the right direction &quot;
                </p>
                <div>
                  <p>
                    <strong>Mum of little girl new to AAC</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Self-assessment referral form</h3>
                <p>Get the latest referral form</p>
                <div className={styles.downloadButtonContainer}>
                  <Button href="/docs/ReferralFormPdf.pdf">
                    Download form
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(() => {
  return {
    props: {
      seo: {
        title: "Self-funded assessments",
        description:
          "We offer independent interdisciplinary assessments to identify appropriate assistive technology resources for people with physical and/or communication impairments to support their communication and learning.",
      },
    },
  };
});
