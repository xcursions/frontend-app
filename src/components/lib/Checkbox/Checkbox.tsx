"use client";

import type { FC } from "react";
import React from "react";

import type CheckboxProps from "./CheckboxProps";

const Checkbox: FC<CheckboxProps> = ({
  label,
  wrapperClassname,
  labelClassname,
  name,
  type,
  id,
  errorMsg,
  ...rest
}) => {
  return (
    <fieldset
      className={`mep_checkbox txt-14${
        wrapperClassname ? ` ${wrapperClassname}` : ""
      }${errorMsg ? " error_state" : ""}`}
    >
      <input
        id={id}
        // type="checkbox"
        name={name}
        {...rest}
        type={type === "radio" ? "radio" : "checkbox"}
      />
      <label
        htmlFor={id}
        className={` ${labelClassname && `${labelClassname}`}`}
      >
        {label}
      </label>
      {errorMsg ? (
        <span className="mep_checkbox_errormsg txt-12">{errorMsg}</span>
      ) : null}
    </fieldset>
  );
};

export default Checkbox;
