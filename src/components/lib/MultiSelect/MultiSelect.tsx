/* eslint-disable import/no-extraneous-dependencies */
import type { FC } from "react";
import Select from "react-select";

import styles from "./MultiSelect.module.scss";
import colourStyles from "./MultiSelectConfig";
import type MultiSelectProps from "./MultiSelectProps";

const MultiSelect: FC<MultiSelectProps> = ({
  label,
  error,
  helperText,
  containerClass,
  options,
  onChange,
  value,
  onFocus,
}) => {
  return (
    <div>
      <div className="">
        {label && <label className={styles.label}>{label} </label>}
        <div className={`${styles.container} ${containerClass || ""}`}>
          <Select
            isClearable={false}
            closeMenuOnSelect={false}
            isMulti={true}
            options={options}
            styles={colourStyles}
            onChange={onChange}
            value={value}
            onFocus={onFocus}
          />
        </div>
      </div>

      {helperText && (
        <span
          className={`${styles.helper_text} ${error ? "text-red-600" : ""}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;
