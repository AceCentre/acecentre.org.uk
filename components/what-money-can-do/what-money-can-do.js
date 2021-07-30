import styles from "./what-money-can-do.module.css";

import { ImageWithLoader as Image } from "../image";

export const WhatMoneyCanDo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/what-money-can-do.jpg"
          layout="fill"
          objectFit="cover"
          alt="Two people looking at a communication device"
        />
        <div className={styles.imageOverlay}></div>
      </div>
      <div>
        <h2>What your money can do</h2>
        <div className={styles.whatItCanDoList}>
          <WhatItCanDo cost="5" color="#CAD400">
            Helps ensure a prompt telephone or email response to someone feeling
            desperate
          </WhatItCanDo>
          <WhatItCanDo cost="25" color="#6499C4">
            Can provide an alphabet or picture communication board for someone
            with little or no speech
          </WhatItCanDo>
          <WhatItCanDo cost="50" color="#574867">
            Helps us to provide an hour’s appointment so someone with severe
            communication challenges can start getting the right support at last
          </WhatItCanDo>
          <WhatItCanDo cost="100" color="#D17D00">
            A full day’s training for families, with the opportunity to meet
            other parents who support children with challenging communication
            needs.
          </WhatItCanDo>
        </div>
      </div>
    </div>
  );
};

const WhatItCanDo = ({ cost, children, color }) => {
  return (
    <div className={styles.whatItCanDoContainer}>
      <style jsx>{`
        .background {
          background-color: ${color};
        }
      `}</style>
      <div className={`background ${styles.circle}`}>
        <span className={styles.poundSign}>£</span>
        <span className={styles.cost}>{cost}</span>
      </div>
      <p className={styles.description}>{children}</p>
    </div>
  );
};
