/* eslint-disable unused-imports/no-unused-vars */
import React from "react";

import styles from "./OtpInput.module.scss";

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

const OtpInput = ({ value, valueLength, onChange }: Props) => {
  return (
    <div className={styles.otp_group}>
      {[1, 2, 3, 4, 5, 6].map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className={styles.otp_input}
          value={digit}
        />
      ))}
    </div>
  );
};

export default OtpInput;
