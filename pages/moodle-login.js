export default function NullPage() {
  return <></>;
}

export const getServerSideProps = ({
  query: { verify_code, mdl_uid, wdmaction },
}) => {
  if (!wdmaction || !mdl_uid || !verify_code) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: "https://learning.acecentre.org.uk",
      permanent: false,
    },
  };
};

// http://localhost:8888?verify_code=1&mdl_uid=123&wdmaction=123
