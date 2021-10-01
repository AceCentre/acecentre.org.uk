import styles from "./give-us-a-call.module.css";
import PhoneIcon from "@material-ui/icons/Phone";
import { SvgIcon } from "@material-ui/core";

export const GiveUsACall = ({ className }) => {
  return (
    <div className={className}>
      <h3 className={styles.title}>Give us a call</h3>
      <p className={styles.phoneNumber}>
        <SvgIcon fontSize="inherit" htmlColor="#00537F">
          <PhoneIcon />
        </SvgIcon>
        0800 080 3115
      </p>
      <p className={styles.officeHours}>
        Office hours, 9AM - 5PM, Monday - Friday
      </p>
    </div>
  );
};
