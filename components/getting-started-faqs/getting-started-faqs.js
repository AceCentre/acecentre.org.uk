import styles from "./getting-started-faqs.module.css";

import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { FormModal, LANG_LIB } from "../ms-form";
import Link from "next/link";

export const GettingStartedFaqs = () => {
  return <GenericFaqs faqs={FAQS} />;
};

export const GenericFaqs = ({ faqs, whiteBackground = false }) => {
  const [selected, setSelected] = useState([]);

  return (
    <div
      className={`${styles.container} ${
        whiteBackground ? styles.whiteBackground : styles.greyBackground
      }`}
    >
      <div className={styles.innerContainer}>
        <h2 className={styles.faqTitle}>FAQs</h2>
        <p className={styles.faqTagline}>
          Answering common queries and concerns.
        </p>
        <Accordion
          onChange={(selectedItems) => setSelected(selectedItems)}
          allowMultipleExpanded
          allowZeroExpanded
        >
          {faqs.map((faq, index) => {
            const uuid = index + 1;
            return (
              <AccordionItem uuid={uuid} key={faq.question}>
                <AccordionItemHeading aria-level="3">
                  <AccordionItemButton className={styles.faqQuestion}>
                    <Avatar className={styles.avatar}>
                      {selected.includes(uuid) ? (
                        <KeyboardArrowDownIcon className={styles.icon} />
                      ) : (
                        <ChevronRightIcon className={styles.icon} />
                      )}
                    </Avatar>
                    {faq.question}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className={styles.faqAnswer}>{faq.answer}</div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export const LANGUAGE_LIBRARY_FAQS = [
  {
    question: "What sort of vocabularies are in the library?",
    answer: (
      <>
        <p>
          The library is a list of AAC vocabularies in Languages Other than
          English. There are vocabularies that have symbols and others that are
          text-only. There are vocabularies that are available on
          electronic/powered AAC devices and ones that are available as
          paper-based AAC.
        </p>
      </>
    ),
  },
  {
    question: "Who can add a vocabulary to the library?",
    answer: (
      <>
        <p>
          Anyone who has created a vocabulary can add it to the library to let
          other people know it exists. If you’re adding a vocabulary make sure
          you let people know where they can get it from.
        </p>
      </>
    ),
  },
  {
    question: "How do I add a vocabulary to the library?",
    answer: (
      <>
        <p>
          Watch our demo video on how to create an account and start adding
          vocabularies.
        </p>
        <LiteYouTubeEmbed
          id={"UKewXPsCW5Y"}
          title="A youtube video about how to contribute to the AAC language library"
          noCookie={true}
        />
      </>
    ),
  },
  {
    question: "What information do I need to add a vocabulary to the library?",
    answer: (
      <>
        <p>
          You need to add in quite a bit of information including, the
          language(s) of the vocabulary, the features of the vocabulary and how
          the vocabulary was created. The entry-form will take you through it
          step-by-step.
        </p>
      </>
    ),
  },
  {
    question:
      "How should I answer the question “when the vocabulary was created what features of the language were considered”?",
    answer: (
      <>
        <p>
          It is helpful to give as much information as possible here about what
          steps were taken to make the resource appropriate for the language.
          This could include things like:
        </p>
        <ul>
          <li>
            The language is read right to left so the vocabulary in the resource
            is laid out right to left
          </li>
          <li>
            The fringe words in the vocabulary (e.g. names of festivals, foods &
            places) have been picked as they are words that someone
            communicating in that language is likely to want to talk about
          </li>
          <li>
            The core words in the vocabulary have been picked because they are
            the most frequently used core words in that language
          </li>
          <li>
            The resource is set-up to allow the user to create grammatically
            correct utterances e.g. the correct gender forms of words are
            available
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I add paper-based resources to the library?",
    answer: (
      <>
        <p>
        Paper-based AAC includes resources such as alphabet charts, symbol charts and communication 
        books.  It is great when paper-based resources are shared.  You can add them by uploading 
        the file to the library, sharing a link to where the resource can be downloaded or sharing 
        your contact details so people can ask you to send them the resource.
        </p>
        <p>
        If you are adding paper-based resources that have symbols or pictures please see the FAQ question
         ‘What are the copyright implications for uploading resources with symbols?’
        </p>
      </>
    ),
  },
  {
    question: "What are the copyright implications for uploading resources with symbols?",
    answer: (
      <>
        <p>
        There are no copyright implications if you upload an original file format e.g. 
        if you make the resource in Boardmaker and then upload the Boardmaker file, if you make the 
        resource in InPrint and then upload the InPrint file etc.
        </p>
        <p>
        If you upload resources in another file format (e.g. PDF, screenshot etc) it is your 
        responsibility to ensure you comply with the company’s copyright regulations.
        </p>
        <p>
        Information on copyright for sharing PCS symbols is available here:
          <a href="https://uk.tobiidynavox.com/pages/pcs-licensing"> https://uk.tobiidynavox.com/pages/pcs-licensing</a>
        </p>
        <p>
          Information on copyright for sharing Widgit symbols is available here: 
          <a href="https://www.widgit.com/symbol-services/licensing.htm"> https://www.widgit.com/symbol-services/licensing.htm</a>
        </p>
      </>
    ),
  },
  {
    question: "Why hasn’t the vocabulary I added been made public?",
    answer: (
      <>
        <p>
          A team of AAC professionals based in England read through the
          information that has been submitted before it is made public.
        </p>
        <p>
          If the team think the information provided may not be helpful enough
          for people using the library they will get back to you to discuss the
          vocabulary before making your entry public.
        </p>
      </>
    ),
  },
  {
    question: "Is information about the vocabularies checked/moderated?",
    answer: (
      <>
        <p>
          To stop spam, a team of AAC professionals based in England read
          through the information that has been submitted before it is made
          public.
        </p>
        <p>
          It isn’t possible for the team to guarantee the quality/accuracy of
          vocabularies or the information about them. Before you pay for a
          vocabulary it is best to contact the supplier to check it meets your
          needs.
        </p>
      </>
    ),
  },
  {
    question: "How can I give feedback about a vocabulary in the library?",
    answer: (
      <>
        <p>
          Please send all your feedback and feature requests about vocabularies
          directly to the person/company who made the vocabulary.
        </p>
        <p>
          If your feedback is about how a vocabulary is listed in the library
          e.g. if a listed vocabulary is no longer available, please fill out
          the form below and we’ll look into it.
        </p>
        <p>
          If the vocabulary you were looking for is not available, please use the
          form below to provide more information on this.
        </p>

        <FormModal form={LANG_LIB}>
          {({ onClick }) => (
            <p>
              <Link href="#" onClick={onClick}>
                Click here to open the correction form
              </Link>
            </p>
          )}
        </FormModal>

        <p></p>
      </>
    ),
  },
];

const FAQS = [
  {
    question: "Won’t using AAC hold back speech development?",
    answer: (
      <>
        <p>
          This is a really common anxiety. However, all the research suggests
          that far from holding speech back, using AAC can even encourage it.
        </p>
        <p>
          For example, when{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/16671842/">
            Diane Millar, Janice Light and Ralph Schlosser
          </a>{" "}
          analysed the literature in 2006, they found that following the
          introduction of AAC, no cases demonstrated a decrease in speech
          production, some showed no change, and most demonstrated gains in
          speech production.
        </p>
        <p>
          For some, use of AAC will be part of their journey towards speech.
          Whilst speech is developing, it can underpin the development of their
          language and communication skills. This means that language isn’t ‘put
          on hold’ until speech comes, resulting in long term deficits or
          delays. For others, use of AAC will be part of their lives forever.
          Either way, putting the work in now will only help someone to be a
          good communicator, however this is done, in the future.
        </p>
        <p>
          If you would like to read some of the journal articles around this
          area,{" "}
          <a href="http://praacticalaac.org/praactical/research-reviews-supporting-the-use-of-aac/">
            there is a great list of relevant articles here.
          </a>
        </p>
        <p>
          <a href="http://tdvox.web-downloads.s3.amazonaws.com/MyTobiiDynavox/td-myths-aac-and-speech.pdf">
            You will also find a good summary of the issues and research here.
          </a>
        </p>
      </>
    ),
  },
  {
    question:
      "Why do you recommend paper based resources alongside screen based solutions?",
    answer: (
      <>
        <p>
          The world of communication aid technology has come on so far in the
          last few years that some people question whether there is still a role
          for low tech (or paper-based) AAC. There is! Paper based resources are
          wonderfully flexible and can be used in so many different contexts.
          They have the great advantage of not requiring batteries, so they are
          always available, and with no screen to smash, they are pretty durable
          too. For some, paper based resources are a great back up to their high
          tech system (for example, when their system runs out of battery or
          when they are somewhere where the high tech system can’t be used –
          like bed or bath), and for others they are their main method of
          communication.
        </p>
        <p>
          In reality most people who use AAC communicate using a range of
          different approaches that includes their own mixture of low tech AAC,
          sounds (or some speech), gesture, signing, drawing, writing and high
          tech AAC. For example, someone might use their eyes to draw your
          attention to the box of cereal they would like you to pass them, make
          a sound to greet a friend, and use their high tech AAC device to have
          a discussion around an issue that is important to them.{" "}
          <a href="https://youtu.be/jpf1Xs1CLnw">
            Beth explains this beautifully in her video.
          </a>
        </p>
        <p>
          Janice Light and David McNaughton are well known researchers in the
          field. They stress that technology in and of itself is not important –
          what’s important is the communication. Technology is just one tool
          among many that can help us to communicate.
        </p>
      </>
    ),
  },
  {
    question: "Can you offer training at my school or workplace?",
    answer: (
      <>
        <p>
          Absolutely!&nbsp;
          <a href="https://acecentre.org.uk/services/training/#bespoke-training">
            You can find out about our training services here.
          </a>
        </p>
        <p>
          We have also developed packages to support others to deliver
          training.&nbsp; See{" "}
          <a href="https://acecentre.org.uk/resources/you-matter/">
            You Matter
          </a>{" "}
          for more information.
        </p>
      </>
    ),
  },
  {
    question: "How do I get started with Symbol charts?",
    answer: (
      <>
        <p>
          Getting started with low tech AAC is all about finding a way of
          bringing AAC into daily activities that are relevant for you and your
          family.&nbsp; It’s about finding communication opportunities that are
          motivating and fun.
        </p>
        <p>
          These charts are one small step on the journey towards developing a
          full communication system based around symbols.
        </p>
        <p>
          The charts are there to be used by you.&nbsp; If the child begins to
          join in, that’s great, but don’t force them to use the symbols.&nbsp;
          They need to become really familiar with the symbols and how to use
          them.&nbsp; That can only happen by you using them yourself as you
          talk to your child.&nbsp; You can see an example of this{" "}
          <a href="https://www.youtube.com/watch?v=ieeREOclfPE&amp;list=PLWWQ5nlUD_ttEtnbmILMp0e35-Dic2JUb&amp;index=2">
            in action here
          </a>
          . You really are the key to getting started with AAC.&nbsp; Your skill
          at pointing to the symbols while talking to and playing with your
          child is what will get AAC going.
        </p>
        <p>
          The example charts are designed to be accessed by pointing to the
          symbols.&nbsp; However, you could cut the symbols out and arrange them
          on an E-tran frame for eye pointing communicators.&nbsp; You can see
          an example of symbols being{" "}
          <a href="https://www.youtube.com/watch?v=cuwgD8YZD3k&amp;list=PLWWQ5nlUD_ttEtnbmILMp0e35-Dic2JUb&amp;index=11">
            selected on an E-tran here
          </a>
          . You could also scan through the symbols for those using{" "}
          <a href="https://www.youtube.com/watch?v=NY2D59MpxBw&amp;list=PLWWQ5nlUD_ttEtnbmILMp0e35-Dic2JUb&amp;index=12">
            listener mediated scanning
          </a>
          , although make sure you are consistent in the order in which you
          offer the symbols.
        </p>
        <p>
          The communication charts in the{" "}
          <a href="https://acecentre.org.uk/resources/">Resources section</a>
          are available in three different symbols sets – PCS (Picture
          Communication Symbols), Widgit and Symbolstix. &nbsp;&nbsp;No one
          symbol set is ‘better’ than another, it’s more a case of looking
          around at what symbols (if any) are being used in the child’s
          environment and trying to use the same.&nbsp; Similarly if the child
          is using symbols within a communication app or communication aid, or
          some sort of recording software, it is helpful to choose the same
          symbols if possible.
        </p>
        <p>
          There are a set of words that we use across huge numbers of different
          situations – these are known as ‘core’ words.&nbsp; These are words
          like ‘help’, ‘look’, ‘more’, ‘stop’, etc.&nbsp; Some of the charts
          simply contain core vocabulary, which means that you can use them in
          any situation.&nbsp; Other charts have been designed to show how
          charts can support specific activities.&nbsp; However, these charts
          all contain some core vocabulary too.&nbsp; Hopefully at least one of
          the activities will be something that appeals to your child.
        </p>
        <p>
          Try and choose a chart that feels a step ahead of where you think your
          child is at.&nbsp; This will enable you to demonstrate the next steps
          as you use the chart.&nbsp; It’s what we do all the time with speaking
          children – we repeat back what they say, adding an extra word.&nbsp;
          We are all natural language teachers!{" "}
          <a href="https://www.youtube.com/watch?v=9WWpdtbwcwA&amp;index=13&amp;list=PLWWQ5nlUD_ttEtnbmILMp0e35-Dic2JUb">
            You can see this in action here.
          </a>
          &nbsp; You can always blank off a few symbols if it feels too much and
          gradually reveal them.
        </p>
        <p>
          On a practical note, if you have access to a laminator, you may want
          to laminate the charts to protect them.&nbsp; If you do this, try and
          use matt laminator pouches as the glossy ones are rather prone to
          reflecting overhead lighting, which can make the symbols difficult to
          see.
        </p>
        <p>
          Once you’ve all gained confidence in using a few of these example
          charts, the next step will be to begin to put together a communication
          book containing a wide range of core and topic vocabulary.&nbsp; For
          this you will need specialist software, although you may find that
          your child’s speech and language therapist and / or school has this
          and can help.
        </p>
        <p>
          You will find much more information about all of the above issues in
          the new resource{" "}
          <a href="https://acecentre.org.uk/resources/all?category=made-by-ace&subcategory=e-books">
            Getting Started with AAC:&nbsp; Using low tech symbol based systems
            with children
          </a>
          .&nbsp; This resource also contains illustrations of all the charts on
          the website with guidance on how you might use them, and some video
          examples too.
        </p>
      </>
    ),
  },
];
