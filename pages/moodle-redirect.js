export default function NullPage() {
  return <></>;
}

export const getServerSideProps = ({
  req: { wdmaction, mdl_uid, verify_code },
}) => {
  return {
    redirect: {
      destination: `https://backend.acecentre.org.uk?wdmaction=${wdmaction}&mdl_uid=${mdl_uid}&verify_code=${verify_code}`,
      permanent: true,
    },
  };
};
