import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import styles from "../../styles/functional-switching.module.css";

const GEAR_1_FAQS = [
  {
    question: "Key Principles",
    answer: (
      <>
        <ul>
          <li>
            <strong>Use movements the person already makes</strong>. Head
            movements are often a good place to start.
          </li>
          <li>
            <strong>Let them activate the switch accidentally at first</strong>.
            Ensure the response is instantaneous, short and motivating.
          </li>
          <li>
            <strong>Gradually encourage more intentional pressing</strong>. Try
            moving the switch slightly further away.
          </li>
        </ul>
        <p>
          Avoid "swatting" by keeping switch use purposeful and avoiding
          over-prompting. See Tony Jones' excellent{" "}
          <a
            href="https://talksense.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TalkSense resources
          </a>{" "}
          for more.
        </p>
      </>
    ),
  },
  {
    question: "FUN Activities for First Gear",
    answer: (
      <>
        <p>
          At this stage it is best to focus on very short, immediate rewards
          that are motivating for the individual. If they don't attend or react
          then change the activity. If they quickly lose interest then you might
          be ready for second gear!
        </p>
        <p>Use the button to:</p>
        <ul>
          <li>
            Instruct someone to tickle or kiss the person (for four seconds)
            (e.g. a BIGMack or Smooth Talker)
          </li>
          <li>
            Turn on a fan, light or a vibrating therapy cushion (for four
            seconds) (e.g. using a Pretorian Twin SLAT)
          </li>
          <li>
            Play music while it is being held down, and then stops when it is
            released. You can do this using:
            <ul>
              <li>
                An iPad app (RadSounds) that can play music while a switch it
                held, and pause when released.
              </li>
              <li>An AutoHotKey script in Microsoft Windows.</li>
              <li>Powered speakers plugged into an iClick</li>
            </ul>
          </li>
        </ul>
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
          At this stage you can offer expand and lengthen the rewards to larger
          sections of songs, longer periods of tickling or simple video games.
          This might help with engagement!
        </p>
        <p>Use your buttons to:</p>
        <ul>
          <li>
            Play and pause songs (e.g. using a JoyCable interface with Switch
            Driver 6 to play and pause YouTube)
          </li>
          <li>Turn a fan on and off (e.g. using a Pretorian iClick)</li>
          <li>Play simple computer games (e.g. HelpKidzLearn)</li>
          <li>Call a dog to come over (e.g. LITTLEmack)</li>
        </ul>
      </>
    ),
  },
  {
    question: "What makes for effective switch progress?",
    answer: (
      <>
        <ul>
          <li>
            <strong>Make it FUN and interesting</strong>. Involve people, create
            stories, play games.
          </li>
          <li>
            <strong>Avoid hand-over-hand</strong> or{" "}
            <strong>hand-under-hand</strong> support. If you're doing this then
            the activity isn't motivating or the switch is in the wrong place!
          </li>
          <li>
            <strong>Allow plenty of time, consistency and repetitions</strong>{" "}
            so that the person's switch movements improve.
          </li>
        </ul>
        <p>
          A deep dive into switch development is coming soon from our colleagues
          at{" "}
          <a
            href="https://acecentrelearning.org.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ace Centre Learning
          </a>
          .
        </p>
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
          At this stage we want to give the young person an option of pressing
          one of two switches. There won't necessarily be a 'wrong' answer – so
          let them explore and react accordingly.
        </p>
        <ul>
          <li>
            One button that plays music and the second operates a disco light
            (you may need a Dual latch and timer).
          </li>
          <li>
            One button moves a wheelchair platform forward and the second
            reverses (e.g. Smile Smart Drivedeck)
          </li>
          <li>
            Lots of ideas on the inclusive switch activities (see the{" "}
            <a
              href="https://www.inclusive.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inclusive website
            </a>
            ) and HelpKidzLearn
          </li>
          <li>
            One button instructs a dog to do one thing (such as sit) and the
            second button tells the dog to do another thing (such as play dead!)
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What if I can't use two switches?",
    answer: (
      <>
        <p>
          Some people may find using two switches difficult due to limited
          movements or fatigue. In this case they may benefit from using a
          single switch instead.
        </p>
        <p>
          We recommend that you only consider using a single switch once you are
          sure that two switches aren't going to work. This is because
          activities are limited with a single switch, and although scanning is
          possible the need for timed activation is a major barrier for many
          people with complex bodies.
        </p>
        <p>
          We are planning on adding a section on timing skills in the coming
          weeks. In the meantime you can find out more on the{" "}
          <a
            href="https://www.inclusive.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inclusive Technology website
          </a>
          .
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
          other. That's why big, obvious cues are needed to confirm this and
          short scan ranges.
        </p>
        <ul>
          <li>
            Have three people sit in a line. One talking button says "next
            person" and the next stands and the previous sits. The second
            talking buttons says "dance" and that person currently standing
            dances. (e.g. LittleMack)
          </li>
          <li>
            Build a tower on a computer with one button and knock it down with
            the other (e.g. Switch Skills for Two set 2). You can also replicate
            this in the real world using a talking button (e.g. Smooth Talker).
          </li>
          <li>
            Use a switch-accessible joke box to play your favourite jokes (e.g.
            GoTalk Now Lite)
          </li>
        </ul>
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
          <li>
            Switch-accessible YouTube that forces you to select the "activation"
            to play the video (e.g. Special Bites)
          </li>
          <li>
            Put words together and build sentences using a switch-accessible
            literacy app (e.g. Clicker)
          </li>
          <li>
            Assemble symbols and speak sentences using a communication aid app
            (e.g. CBoard)
          </li>
          <li>
            Switch-accessible YouTube that allows you to navigate the video
            using switches (e.g. Tar Heel Game Play)
          </li>
        </ul>
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
              developed by <strong>Charlie Danger</strong> in collaboration with{" "}
              <a
                href="https://cenmac.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                CENMAC
              </a>{" "}
              and <strong>Kezia Hesketh</strong> at Ace Centre.
            </p>
            <p className={styles.intro}>
              The focus of FUNctional Switching is the use of fun activities
              that encourage engagement with peers and family members while
              developing switch skills. The five stages to FUNctional Switching
              are clear and easy to follow.
            </p>
          </div>
        </div>

        <div className={styles.container}>
          <section className={styles.section}>
            <h2>Our Gears Analogy</h2>
            <p>
              Learning to use switches can be thought of like learning to drive
              a manual car. The early stages get you moving, but after that, the
              gears can be shifted around based on context and activity.
            </p>
            <p>
              Our <strong>first gear</strong> is the important place to begin.
              Just like you can't start driving without first gear, you can't
              begin switch work without understanding cause and effect. This is
              the foundational skill that everything else builds on.
            </p>
            <p>
              Gears 2 to 5 are all about refining and expanding switch use. You
              don't always need to use them in order. Sometimes you cruise
              through all the gears in sequence; sometimes you skip straight to
              a higher gear, depending on the task and motivation. Other times,
              you might shift down for more control. Every gear has its place.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why Learn Switches?</h2>
            <p>
              Switches are very useful for people with physical and/or
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
              Most people learn quickly to press a single switch for a single
              response (often referred to as "cause and effect"). Some require
              additional opportunities to learn.
            </p>
            <p>
              Some activities require understanding of <strong>scanning</strong>
              . This is the approach used to choose from many options when you
              can only press one or two switches. Scanning is needed to type any
              letter of the alphabet, or to select from a wide range of symbols
              on a communication aid.
            </p>
            <p>
              The process of learning from simple cause-and-effect up to
              scanning is known as <strong>switch development</strong>. The five
              steps of FUNctional Switching is our take on this process.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Before You Begin</h2>
            <p>
              Get to know the person before you introduce your first switch. If
              possible spend some time with them while they engage in their
              preferred activities. If it's a child then watch the parents or
              other people play with the child.
            </p>
            <p>
              During this step you can observe some essential information such
              as:
            </p>
            <ul className={styles.featureList}>
              <li>
                <strong>Sensory Skills</strong> (particularly vision and
                hearing)
              </li>
              <li>
                <strong>Physical Skills</strong> (for switches access points)
              </li>
              <li>
                <strong>Motivation</strong> (FUN and engagement are key to
                learning!)
              </li>
            </ul>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Gear 1</span>
              <h2>Cause & Effect</h2>
            </div>
            <p>
              Understanding that the switch causes something to happen is an
              essential first step. Often learners already understand this idea
              in general, but haven't connected it with switch use.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_1_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Gear 2</span>
              <h2>New Movements</h2>
            </div>
            <p>
              Once the person understands that the switch does a load of really
              cool stuff they are likely to put some effort into learning new
              movements or using movements which initially they might find
              difficult. Work around the person's body to find at least two, if
              not more, movements that reliably activate the switch. It doesn't
              matter too much if these seem clumsy or take a while to initiate –
              we'll improve these later. Bring lots of activities and have lots
              of FUN.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_2_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Gear 3</span>
              <h2>Two Switches</h2>
            </div>
            <p>
              Having two switches in two different parts of the body is a bit of
              a leap that requires coordination, problem solving, sequencing,
              making choices and a load of other skills. Fortunately, you can
              learn these skills through FUN activities.
            </p>
            <p>
              Just remember at this stage the switches do two different things.
              When the person chooses a switch be sure that you react quickly.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_3_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Gear 4</span>
              <h2>Build or Scan Failure Free</h2>
            </div>
            <p>
              At this point the young person is motivated and coordinated to use
              two or more switches. It's a good time to introduce the rather
              peculiar concept of scanning, which involves one switch
              interacting with the other. Scanning can be taught through
              error-less activities as it can be a bit confusing at first.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_4_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.gearSection}>
            <div className={styles.gearHeader}>
              <span className={styles.gearBadge}>Gear 5</span>
              <h2>Scanning with Purpose</h2>
            </div>
            <p>
              By providing scanning we are providing choice, and we're able to
              interpret that choice as an intentional and meaningful way to
              communicate. Playing computer games that involve scanning to
              particular cells to 'win' is a good start, as is beginning to
              interact differently to utterances from the communication aid. At
              this point we assume that if someone scans on the communication
              aid and says something – they mean it and we act accordingly.
            </p>
            <div className={styles.faqContainer}>
              <div className="functional-switching-faqs-override">
                <GenericFaqs faqs={GEAR_5_FAQS} />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>More Resources</h2>
            <ul className={styles.resourcesList}>
              <li>
                <a
                  href="https://cenmac.com/resources/developing-switch-skills/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CENMAC Activity Book (version 2)
                </a>
              </li>
              <li>
                <a
                  href="https://www.lindaburkhart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stepping Stones to Switch Access by Linda Burkhart
                </a>
              </li>
              <li>
                <a
                  href="https://jiao.life"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jiao.Life – Seven Stages of Switch Development (by Luke
                  Thompson)
                </a>
              </li>
              <li>
                <a
                  href="https://www.indigounlockingabilities.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Indigo Unlocking Abilities – Switch Resources
                </a>
              </li>
              <li>
                <a
                  href="https://talksense.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TalkSense Switching to Success (Tony Jones)
                </a>
              </li>
              <li>
                <a
                  href="https://www.judylynnsoftware.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Judy Lynn Software, Inc.
                </a>
              </li>
              <li>
                <a
                  href="https://www.helpkidzlearn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HelpKidzLearn (from Inclusive Technology)
                </a>
              </li>
              <li>
                <a
                  href="https://www.pacecentre.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pace Centre My Way
                </a>
              </li>
              <li>
                <a
                  href="https://www.inclusive.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inclusive Technology
                </a>
              </li>
              <li>
                <a
                  href="https://www.jabbla.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Steps Before Step Scanning 2.5 – Mind Express by Jabbla (by
                  Linda Burkhart and Flo Quinn)
                </a>
              </li>
              <li>
                <a
                  href="https://www.oneswitch.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OneSwitch (by Barrie Ellis)
                </a>
              </li>
              <li>
                <a
                  href="https://www.tarheelreader.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TarHeel Gameplay
                </a>
              </li>
              <li>
                <a
                  href="https://www.specialbites.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SpecialBites
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.acknowledgement}>
            <h2>Acknowledgement and Thanks</h2>
            <p>
              This work builds on the successful strategies developed by Linda
              Burkhart, Judy King, Tony Jones, Ian Bean and Michelle Lange.
            </p>
            <p>
              The model was inspired by the teachers and therapists supported
              while I was working in Qatar. Thanks go out to the staff at Mada
              and Hamad Medical Corporation for their feedback and frequent
              reminders to keep it simple.
            </p>
            <p>
              Thanks also goes to Will Wade and Alli Gaskin at Ace Centre for
              their encouragement and support, and particularly to Alli for
              providing the name FUNctional Switching.
            </p>
            <p className={styles.credit}>
              <em>
                Content adapted from{" "}
                <a
                  href="https://cenmac.com/resources/developing-switch-skills/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CENMAC's FUNctional Switching resource
                </a>
                , developed by Charlie Danger in collaboration with CENMAC and
                Kezia Hesketh at Ace Centre.
              </em>
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
