import { useEffect, useState } from "react";

export const ALL_FORMS = [
  {
    slug: "contact",
    url:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=bFwgTJtTgU-Raj-O_eaPrAMkFY0VGxNInNkKbPsrRolUM09NTDlHMUIxSEZMV1dNNVdNMURCOFIxSS4u&embed=true",
    height: 920,
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
            height: ${form.height + 100}px;
          }
        }
      `}</style>
      <iframe
        src={form.url}
        width="100%"
        className={`iframe ${className}`}
        allowFullScreen
      />
    </>
  );
};
