export default function NullPage() {
  return <></>;
}

export const getServerSideProps = ({ query: { splat } }) => {
  return {
    redirect: {
      destination: `/resources/all?category=${splat}`,
      permanent: true,
    },
  };
};
