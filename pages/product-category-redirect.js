export default function NullPage() {
  return <></>;
}

// Redirect if you are signed in
export const getServerSideProps = async function ({ req }) {
  console.log(JSON.stringify(req, null, 2));

  return {
    redirect: {
      destination: "/resources/all",
      permanent: true,
    },
  };
};
