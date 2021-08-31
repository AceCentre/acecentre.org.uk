import { useEffect, useState } from "react";

export const ALL_FORMS = [
  {
    slug: "contact",
    title: "Contact form",
    url:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlURFpIVDBIVjdTMExFTFZDR1lQNURZQTE0RCQlQCN0PWcu&embed=true",
    height: 1750,
  },
  {
    slug: "information-appointment-feedback",
    title: "Information appointment feedback",
    height: 3700,
    url:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrEio9bWrHCRGoqxiKrWB3RlUQkFTRzlKOUFHR0hEMU9PNzdFR0U3RlgyTiQlQCN0PWcu&embed=true",
  },
];

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
