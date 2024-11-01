import { useEffect, useState } from "react";
import styles from "./ProgressTracking.module.scss";
import { IoCheckmark, IoFlagOutline } from "react-icons/io5";
import { PiCookingPotLight } from "react-icons/pi";
import { IoMdBicycle } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

import { useSelector } from "react-redux";

const ProgressTracking = ({ activeStep }) => {
  // Calculate the percentage width of the active line based on the current step
  const activeLineWidth = ((activeStep - 1) / 3) * 100;

  return (
    <div className={styles.container}>
      {activeStep === 5 ? (
        <div className={styles.errorContainer}>
          <div className={styles.stepError}>
            <MdErrorOutline size={40} className={styles.icon} />
          </div>
        </div>
      ) : (
        <div className={styles.stepContainer}>
          <div className={styles.line}></div>
          <div
            className={styles.activeLine}
            style={{ width: `${activeLineWidth}%` }}
          ></div>
          {[IoCheckmark, PiCookingPotLight, IoMdBicycle, IoFlagOutline].map(
            (Icon, index) => (
              <div
                key={index}
                className={`${styles.step} ${
                  activeStep > index ? styles.active : ""
                }`}
              >
                <Icon size={25} className={styles.icon} />
              </div>
            )
          )}
        </div>
      )}
      {/* <button onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}>
        Prev
      </button>
      <button onClick={() => setActiveStep((prev) => Math.min(prev + 1, 4))}>
        Next
      </button> */}
    </div>
  );
};

export default ProgressTracking;
