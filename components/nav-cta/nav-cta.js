import Link from "next/link";
import styles from "./nav-cta.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Avatar from "@material-ui/core/Avatar";

export const NavCta = ({
  primaryLine,
  secondaryLine,
  iconPath,
  backgroundColour,
  href,
  iconColour,
}) => {
  return (
    <Link href={href}>
      <a className={styles.link}>
        <div className={styles.container}>
          <style jsx>{`
            .colouredBackground {
              background-color: ${backgroundColour};
            }

            img {
              max-width: 240px;
            }
          `}</style>
          <div className={`${styles.topSection} colouredBackground`}>
            <img className={styles.icon} src={iconPath} />
            <div className={`${styles.avatarContainer} avatarParent`}>
              <Avatar
                style={{ backgroundColor: iconColour }}
                className={`${styles.avatarArrow}`}
              >
                <ArrowForwardIcon />
              </Avatar>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <p className={styles.primaryLine}>{primaryLine}</p>
            <p className={styles.secondaryLine}>{secondaryLine}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};
