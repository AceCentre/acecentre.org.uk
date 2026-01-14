import Link from "next/link";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { Button } from "../../components/button/button";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import styles from "../../styles/functional-switching.module.css";

const GEAR_1_FAQS = [
  {
    question: "Key Principles",
    answer: (
      <>
        <ul>
          <li>
            <strong>Use movements the learner already makes.</strong> Head
            movements are often a good place to start.
          </li>
          <li>
            <strong>
              Allow the learner to activate the switch accidentally at first.
            </strong>{" "}
            Ensure the response is immediate, brief, and motivating.
          </li>
          <li>
            <strong>
              Gradually encourage more intentional switch presses.
            </strong>{" "}
            One way to do this is by moving the switch slightly further away.
          </li>
        </ul>
        <p>
          Avoid &quot;swatting&quot; by keeping switch use purposeful and
          avoiding over-prompting. See Tony Jones&apos; excellent{" "}
          <a
            href="https://talksense.weebly.com/training-switch.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            TalkSense resources
          </a>{" "}
          to learn more.
        </p>
      </>
    ),
  },
  {
    question: "FUN Activities for First Gear",
    answer: (
      <>
        <p>
          At this stage focus on very short, immediate rewards that are
          motivating for the learner. If they do not attend or react, then
          change the activity. If they quickly lose interest, then you might be
          ready for second gear!
        </p>
        <p>Example activities:</p>
        <ul>
          <li>Instruct someone to tickle or kiss the learner</li>
          <li>Turn on a battery powered toy</li>
          <li>Play music</li>
        </ul>
        <p>
          Find activity ideas with guides on how to set them up
          <Link href="/activity-book/select"> here.</Link>
        </p>
      </>
    ),
  },
];

const GEAR_2_FAQS = [
  {
    question: "FUN Activities for Second Gear",
    answer: (
      <>
        <p>
          At this stage you can offer, expand, and lengthen the effect of
          activating a switch. Give longer periods of songs being played, toys
          being activated, or tickles being given. You can introduce simple
          video games which might help with engagement!
        </p>
        <p>Example activities:</p>
        <ul>
          <li>Play and pause videos on YouTube</li>
          <li>Turn a fan on and off</li>
          <li>Play simple computer games</li>
        </ul>
        <p>
          Find activity ideas with guides on how to set them up
          <Link href="/activity-book/select"> here.</Link>
        </p>
      </>
    ),
  },
  {
    question: "What makes for effective switch progress?",
    answer: (
      <>
        <ul>
          <li>
            <strong>Make it FUN and interesting.</strong> Involve people, create
            stories and play games.
          </li>
          <li>
            <strong>Avoid hand-over-hand or hand-under-hand support.</strong> If
            you find yourself doing this, it is a sign that the activity is not
            motivating enough, or the switch is in the wrong place!
          </li>
          <li>
            <strong>Allow plenty of time, consistency, and repetition</strong>{" "}
            so that the learner&apos;s movements improve.
          </li>
        </ul>
      </>
    ),
  },
];

const GEAR_3_FAQS = [
  {
    question: "FUN Activities for Third Gear",
    answer: (
      <>
        <p>
          At this stage we want to give the learner an option of pressing one of
          two switches. There won&apos;t necessarily be a &apos;wrong&apos;
          answer – so let them explore and react accordingly.
        </p>
        <p>Example activities with two switches:</p>
        <ul>
          <li>One switch plays music; the other turns on a disco light</li>
          <li>
            One switch moves a wheelchair platform forward; the other moves it
            back
          </li>
          <li>
            One switch is &apos;Simon Says ...&apos;; the other is just
            &apos;Says...&apos;
          </li>
        </ul>
        <p>
          Find activity ideas with guides on how to set them up
          <Link href="/activity-book/select"> here.</Link>
        </p>
      </>
    ),
  },
  {
    question: "What if the learner cannot use two switches?",
    answer: (
      <>
        <p>
          Some learners may find using two switches difficult due to limited
          movements or fatigue. In this case, they may benefit from using a
          single switch instead.
        </p>
        <p>
          We recommend considering a single switch only after confirming that
          two switches won&apos;t work. Activities are more limited with a
          single switch, and while scanning is possible, the need for timed
          activation can be a major barrier for many learners with complex
          physical needs.
        </p>
      </>
    ),
  },
];

const GEAR_4_FAQS = [
  {
    question: "FUN Activities for Fourth Gear",
    answer: (
      <>
        <p>
          At first it may be difficult to understand that one switch affects the
          other. That&apos;s why big, obvious cues are needed to confirm this,
          alongside short scan ranges.
        </p>
        <p>Example activities with two switches for scanning:</p>
        <ul>
          <li>
            One switch scans through people, the other to choose who does a
            silly dance
          </li>
          <li>
            One switch builds a tower, the other says when to knock it down
          </li>
          <li>
            One switch scans through dress up items, the other switch chooses
            what to wear
          </li>
        </ul>
        <p>
          Find activity ideas with guides on how to set them up
          <Link href="/activity-book/select"> here.</Link>
        </p>
      </>
    ),
  },
];

const GEAR_5_FAQS = [
  {
    question: "FUN Activities for Fifth Gear",
    answer: (
      <>
        <ul>
          <li>One switch scans YouTube, the other selects what to play</li>
          <li>
            One switch scans letters/words, the other selects what comes next in
            a sentence
          </li>
          <li>
            One switch scans book titles, the other selects which book to read
          </li>
        </ul>
        <p>
          Find activity ideas with guides on how to set them up
          <Link href="/activity-book/select"> here.</Link>
        </p>
      </>
    ),
  },
];

export default function FunctionalSwitching() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} activityBook />
      </header>
      <main id="mainContent">
        <BackToLink where="all resources" href="/resources/all" />

        <div className={styles.hero}>
          <div className={styles.container}>
            <h1>FUNctional Switching</h1>
            <p className={styles.intro}>
              FUNctional Switching is an approach to developing switch skills
              created through a CENMAC and Ace Centre collaboration.
            </p>
            <p className={styles.intro}>
              The focus of FUNctional Switching is the use of fun activities
              that encourage engagement between the learner, their peers, and
              family members while developing switch skills. The five stages of
              FUNctional Switching are clear and easy to follow.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Button href="/activity-book/select">
                Create a Switch Activity Book
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <section className={styles.section}>
            <h2>Gears Analogy</h2>
            <p>
              Learning to use switches is like learning to drive a manual car.
              The early gears get you moving, but after that, you can shift
              around the gears based on context and activity.
            </p>
            <p>
              <strong>First Gear</strong> is the initial stage and is all about
              cause and effect. Just like driving, you can&apos;t start without
              first gear, so it is important that you do not begin switch work
              before establishing that the learner understands cause and effect.
              This is the foundational skill that everything else builds on.
            </p>
            <p>
              <strong>Second to Fifth Gears</strong> are all about refining and
              expanding to find at least two reliable movements to activate a
              switch. You do not always need to use them in order. Sometimes you
              cruise through all the gears in sequence; sometimes you skip
              straight to a higher gear, depending on the task and motivation.
              Other times, you might shift down for more control. Every gear has
              its place.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why Learn Switches?</h2>
            <p>
              Switches are very useful for learners with physical and/or
              intellectual difficulties. They can be used to:
            </p>
            <ul className={styles.featureList}>
              <li>Play video games</li>
              <li>Interact with people</li>
              <li>Control the environment</li>
              <li>Provide independent mobility</li>
              <li>Control a communication aid</li>
              <li>Access education</li>
            </ul>
            <p>
              Some learners quickly pick up pressing a switch for a single
              response (often called <strong>cause and effect</strong>) while
              for others we must ensure that they get plenty of opportunities to
              explore switches at this level and beyond.
            </p>
            <p>
              Certain activities involve <strong>scanning</strong>, the method
              used to choose from many options by pressing one or two switches.
              For example, scanning can enable learners to type letters of the
              alphabet and select symbols from a robust vocabulary on a
              communication aid.
            </p>
            <p>
              The process of moving from cause and effect to scanning is known
              as <strong>switch development</strong>. The five gears of
              FUNctional Switching are our take on this process.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Before You Begin</h2>
            <p>
              Get to know the learner before introducing a switch. If possible,
              spend some time with them engaging in preferred activities. If the
              learner is a child, then observe them playing with their parents
              or other familiar people.
            </p>
            <p>During this step observe key information such as:</p>
            <ul className={styles.featureList}>
              <li>
                <strong>Sensory skills</strong> (particularly vision and
                hearing)
              </li>
              <li>
                <strong>Physical Skills</strong> (for switches access points)
              </li>
              <li>
                <strong>Motivation</strong> (FUN and engagement are essential
                for learning!)
              </li>
            </ul>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>First Gear</span>
              <h2>Cause and Effect</h2>
            </div>
            <p>
              Recognising that a switch makes something happen is an essential
              first step. Often learners already understand this idea in general
              but have not connected it to using a switch.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_1_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Second Gear</span>
              <h2>New Movements</h2>
            </div>
            <p>
              Once the learner understands that the switch does a load of really
              cool stuff, they are likely to put effort into learning new
              movements or using movements that might have felt difficult at
              first. Work with the learner to find at least two reliable
              movements to activate a switch. Don&apos;t worry if these seem
              clumsy or slow – we can refine them. It is more important to offer
              plenty of activities and have lots of FUN!
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_2_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Third Gear</span>
              <h2>Two Switches</h2>
            </div>
            <p>
              Using two switches activated by different parts of the body is a
              complex skill that involves coordination, problem-solving,
              sequencing, making choices, and many other abilities. Fortunately,
              you can learn these skills through FUN activities!
            </p>
            <p>
              Just remember at this stage the switches do two different things.
              When the learner activates one of the switches, you need to be
              ready to react quickly.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_3_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Fourth Gear</span>
              <h2>Build or Scan Failure Free</h2>
            </div>
            <p>
              At this point, the learner is motivated and coordinated to use two
              or more switches. This is a great time to introduce the concept of
              scanning, a process where one switch works in combination with
              another. Scanning can feel confusing at first, so start with
              error-free activities to make learning easier.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_4_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Fifth Gear</span>
              <h2>Scanning with Purpose</h2>
            </div>
            <p>
              By teaching a learner how to use scanning, we are providing them
              with choice. We are then able to interpret that choice as
              intentional and meaningful communication.
            </p>
            <p>
              A good way to start is by playing computer games that involve
              scanning particular cells to &apos;win&apos;. Another way is to
              introduce scanning in an AAC app, always assuming when a learner
              scans and selects a word or message that they mean it and then
              acting accordingly.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_5_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.acknowledgement}>
            <h2>Developed by</h2>
            <p>
              Charlie Danger in collaboration with CENMAC and Kezia Hesketh at
              Ace Centre.
            </p>
          </section>

          <section className={styles.acknowledgement}>
            <h2>Acknowledgements</h2>
            <p>
              This work builds on successful strategies developed by Linda
              Burkhart, Judy King, Tony Jones, Ian Bean and Michelle Lange.
            </p>
            <p>
              This model was inspired by the teachers and therapists at Mada and
              Hamad Medical Corporation, Qatar. A special thanks for their
              feedback and frequent reminders to keep it simple.
            </p>
            <p>
              Thanks also go to Will Wade and Alli Gaskin at Ace Centre for
              their encouragement and support. Particularly Alli, for providing
              the name FUNctional Switching.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .functional-switching-faqs-override [class*="faqTitle"] {
          display: none !important;
        }
        .functional-switching-faqs-override [class*="faqTagline"] {
          display: none !important;
        }
        .functional-switching-faqs-override [class*="greyBackground"],
        .functional-switching-faqs-override [class*="whiteBackground"] {
          background: none !important;
        }
        .functional-switching-faqs-override [class*="container"] {
          padding-top: 0 !important;
          padding-bottom: 2rem !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        .functional-switching-faqs-override [class*="innerContainer"] {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
      `}</style>
    </>
  );
}
