import Link from "next/link";
import { ACL_VOTE, FormModal } from "../ms-form";
import styles from "./vote-banner.module.css";

export const VoteBanner = () => {
  return (
    <div className={styles.container}>
      <FormModal form={ACL_VOTE}>
        {({ onClick }) => (
          <p>
            Can&apos;t find a course you want to attend?{" "}
            <Link href="#" onClick={onClick}>
              Click here to vote on what course we run next!
            </Link>
          </p>
        )}
      </FormModal>
    </div>
  );
};
