import { Button } from "../button/button";
import { CORRECTION_FORM, FormModal } from "../ms-form";

export const serviceFinderFaqs = [
  {
    question: "Where does the data come from?",
    answer: <></>,
  },
  {
    question: "What kind of services can you tell me about?",
    answer: <></>,
  },
  {
    question: "How do you know my location?",
    answer: (
      <>
        <p>
          One way we know your location is because you enter your postcode. We
          can then use that to figure out where you are. We don&apos;t store any
          postcode or location information that you provide.
        </p>
        <p>
          Another way we know your location is by asking your web browser. Your
          web browser knows your location by using GPS on your device or your
          network connectivity. To access your location we ask your browser for
          your location and then they will show you a prompt asking you to
          confirm that its okay to share your location with us. We only access
          your location when we need it, but if your worried you can use privacy
          settings to revoke our access to your location.
        </p>
      </>
    ),
  },
  {
    question: "What can I do if the information is wrong?",
    answer: (
      <>
        <p>
          We try really hard to keep all of the information we have up to date.
          However, services change regularly and we are not always kept up to
          date of changes.
        </p>
        <p>
          If you let see anything you know let us know by filling out the form
          below and we can fix it. If you work at one of the services then we
          appreciate if you could let us know if you update any of your details.
        </p>
        <div>
          <FormModal form={CORRECTION_FORM}>
            {({ onClick }) => (
              <div>
                <Button onClick={onClick}>Correction form</Button>
              </div>
            )}
          </FormModal>
        </div>
      </>
    ),
  },
];
