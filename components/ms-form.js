import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useEffect, useState } from "react";

export const CORRECTION_FORM = {
  slug: "correction",
  title: "Service Finder Correction Form",
  height: 1000,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUMFdOTVVJNkM0SktaOUdDSUU1WkMwMTZRUiQlQCN0PWcu&embed=true",
};

export const INFORMATION_RESERVE = {
  slug: "information-reserve",
  title: "Information reserve",
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrMprJ92LB-1NstNAv0YnFvpUOVg5V0U2TVJZRlNYUDYzUlg1MzAwWTRXQS4u&embed=true",
  height: 2000,
};

export const CONTACT_FORM = {
  slug: "contact",
  title: "Contact form",
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlURFpIVDBIVjdTMExFTFZDR1lQNURZQTE0RCQlQCN0PWcu&embed=true",
  height: 2000,
};

export const INFO_APP_FEEDBACK = {
  slug: "information-appointment-feedback",
  title: "Information appointment feedback",
  height: 3700,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUQkFTRzlKOUFHR0hEMU9PNzdFR0U3RlgyTiQlQCN0PWcu&embed=true",
};

export const LEARNING_ENQ = {
  slug: "learning-enquiry",
  title: "Ace Centre Learning enquiry",
  height: 1400,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrGI3PLISoyxPjhhaQvSfizZUNzREN0xLSUdDUURMMVdJUFhaMUVLWjRKSy4u&embed=true",
};

export const COURSE_EVALUATION = {
  slug: "course-evaluation",
  title: "Course evaluation",
  height: 3000,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUNDZMQThISE44NTFZRUc5VDY0MldUNEhEMSQlQCN0PWcu&embed=true",
};

export const INTEREST = {
  slug: "atu-interest",
  title: "ATU Register interest",
  height: 2000,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUN0lSWDZLNFRaNDdQVUZCTzY4WUszR1pQUSQlQCN0PWcu",
};

export const RESOURCE_FEEDBACK = {
  slug: "launchpad-feedback",
  title: "Resource Feedback",
  height: 2000,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUMEZJVllIMkVHSlBEQkxBSkZLU0xaWUxTQyQlQCN0PWcu",
};

export const FEEDBACK = {
  slug: "general-feedback",
  title: "Feedback",
  height: 2000,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlURUQ4RFRTWFM2OElZNjMwSFM5UUVZRFBSVyQlQCN0PWcu",
};

export const SPEECHBUBBLE = {
  slug: "speechbubble",
  title: "SpeechBubble Interest",
  height: 900,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrAMkFY0VGxNInNkKbPsrRolUOE1ZVVhRRjNLUEVEUzdGVjVETklLWjgyTy4u",
};

export const AAC_INFO = {
  slug: "aacinfo",
  title: "AACInfo Interest",
  height: 900,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrAMkFY0VGxNInNkKbPsrRolUMlNOU1JGR0xUNDdLOERYSkc2Tlk1TjFQMy4u",
};

export const ACL_VOTE = {
  slug: "acl-vote",
  title: "Vote on what course to run next",
  height: 900,
  url: "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrAMkFY0VGxNInNkKbPsrRolUODQzSzVCTFg2UFJWUDA2QUJUNTJONVFMVC4u",
};

export const ALL_FORMS = [
  CONTACT_FORM,
  INFO_APP_FEEDBACK,
  LEARNING_ENQ,
  COURSE_EVALUATION,
  INTEREST,
  RESOURCE_FEEDBACK,
  FEEDBACK,
  ACL_VOTE,
];

export const FormModal = ({ children, form, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <>{children({ onClick })}</>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <style jsx>{`
              .iframe {
                height: calc(100vh - 3.75rem - 3.75rem - 2rem - 2rem - 0.5rem);
                margin: 0 auto;
              }
            `}</style>
            <iframe
              title={form.title}
              src={form.url}
              width="100%"
              className={`iframe ${className}`}
              allowFullScreen
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const MsForm = ({ form, className = "" }) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!clientSide) return null;

  return (
    <>
      <style jsx>{`
        .iframe {
          max-width: 640px;
          height: ${form.height}px;
          margin: 0 auto;
        }

        @media (max-width: 800px) {
          .iframe {
            height: ${form.height * 1.2}px;
          }
        }
      `}</style>
      <iframe
        title={form.title}
        src={form.url}
        width="100%"
        className={`iframe ${className}`}
        allowFullScreen
      />
    </>
  );
};
