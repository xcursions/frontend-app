/* eslint-disable import/no-extraneous-dependencies */
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { RichUtils } from "draft-js";
import dynamic from "next/dynamic";
import type { FC } from "react";
import type { EditorProps } from "react-draft-wysiwyg";

import styles from "./WYSIWYGEditor.module.scss";
import { toolbar } from "./WYSIWYGEditorConfig";
import type WYSIWYGEditorProps from "./WYSIWYGEditorProps";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const WYSIWYGEditor: FC<WYSIWYGEditorProps> = ({
  label,
  containerClass,
  error,
  helperText,
  onEditorStateChange,
  ...rest
}) => {
  return (
    <div>
      <div className="">
        {label && <label className={styles.label}>{label} </label>}
        <div
          className={`${styles.container} ${
            containerClass || "transition duration-1000 ease-in-out"
          } ${error ? "border-red-500" : ""}`}
          style={{ height: "400px", overflow: "auto" }}
        >
          <Editor
            wrapperClassName={`demo-wrapper w-full bg-[#F9FAFB] text-[14px]`}
            editorClassName="demo-editor w-full px-5 text-[14px] "
            toolbar={toolbar}
            onEditorStateChange={onEditorStateChange}
            handleReturn={(eventKey, editState) => {
              if (onEditorStateChange && eventKey.code === "Enter") {
                onEditorStateChange(RichUtils.insertSoftNewline(editState));
                return true;
              }
              return false;
            }}
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

export default WYSIWYGEditor;
