import { useEffect, useRef, useState } from "react";
import styles from "./our-vision.module.css";

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

const WE_BELIEVE = [
  <p key="we-believe-1">
    We believe in <span>Equality.</span> Everyone has the right to communicate.
  </p>,
  <p key="we-believe-2">
    We believe in <span>Teamwork.</span> Working to find the best solution.
  </p>,
  <p key="we-believe-3">
    We believe in <span>The Individual.</span> The individual is at the centre
    of our services.
  </p>,
  <p key="we-believe-4">
    We believe in <span>Independence.</span> We provide an independent and
    unbiased service.
  </p>,
  <p key="we-believe-5">
    We believe in <span>Compassion.</span> We treat people with care, empathy
    and understanding.
  </p>,
];

// 10 secs
const SWITCH_TAGLILNE = 10 * 1000;

export const OurVision = () => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [prevSloganIndex, setPrevSloganIndex] = useState(-1);

  useInterval(() => {
    const newIndex = (sloganIndex + 1) % WE_BELIEVE.length;
    setPrevSloganIndex(sloganIndex);
    setSloganIndex(newIndex);
  }, SWITCH_TAGLILNE);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h2>Our vision</h2>
          <p>
            A society where everyone is given the support they need to
            communicate, be understood and fulfil their potential.
          </p>
        </div>
        <div>
          <h2>Our mission</h2>
          <p>
            We provide support, advice, technology and training to enable people
            with complex communication needs to express themselves and meet
            their full potential.
          </p>
        </div>
        <div>
          <h2>Your outcome</h2>
          <p>
            Feeling secure and confident about getting appropriate communication
            support and advice when needed, knowing your abilities and
            experience are valued.
          </p>
        </div>
      </div>
      <div className={styles.weBelieveWrapper}>
        {WE_BELIEVE.map((current, index) => {
          return (
            <div
              key={`we-believe-wrapper-${index}`}
              className={`${styles.weBelieveTagLine} ${
                index === sloganIndex ? styles.active : ""
              } ${index === prevSloganIndex ? styles.prev : ""}`}
            >
              {current}
            </div>
          );
        })}
      </div>
    </div>
  );
};
