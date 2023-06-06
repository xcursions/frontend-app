import React from "react";
import { RiCloseFill } from "react-icons/ri";

import Input from "../Input";
import styles from "../Input.module.scss";
import type { MultipleValuesProps } from "./MultipleValuesProps";

const MultipleValues: React.FC<
  MultipleValuesProps & {
    wrapperClass: string;
  }
> = ({
  className,
  label,
  name,
  values,
  error,
  setValues,
  containerClass,
  wrapperClass,
  helperText,
  ...rest
}) => {
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState<any>(values);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddItem = (event: React.KeyboardEvent, item: string) => {
    if (event.key === "Enter") {
      const oldItems: any[] = [...values];
      oldItems.push(item);
      setItems(oldItems);
      setValues(oldItems);
      setValue("");
    }
  };

  const handleDeleteItem = (index: number) => {
    const oldItems = [...items];
    oldItems.splice(index, 1);
    setItems(oldItems);
    setValues(oldItems);
  };

  return (
    <div className={`${styles.wrapper} ${wrapperClass || ""}`}>
      {label && <label className={styles.label}>{label} </label>}

      <div
        className={`${styles.container} ${
          error ? "border !border-red-600" : ""
        } ${containerClass || ""}`}
      >
        <div
          className={`flex w-full flex-wrap items-center space-x-2 overflow-hidden rounded-md border  bg-transparent text-base ${className}`}
        >
          {values &&
            values.map((item, index) => (
              <div
                key={index}
                className="bg-primary-500/50 m-2 mr-0 flex items-center gap-2 rounded-md border px-2 py-1.5"
              >
                <span className="text-sm text-gray-500">{item}</span>
                <RiCloseFill
                  className="h-15 w-15"
                  onClick={() => handleDeleteItem(index)}
                />
              </div>
            ))}
          <Input
            id={name}
            name={name}
            type="text"
            className="flex-1 rounded-md p-3"
            value={value}
            onKeyDown={(e) => handleAddItem(e, value)}
            onChange={handleChange}
            {...rest}
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

export default MultipleValues;
