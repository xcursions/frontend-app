/* eslint-disable import/no-extraneous-dependencies */
import "react-quill/dist/quill.snow.css";

import imageCompressor from "quill-image-compress";
import { type FC } from "react";
import ReactQuill, { Quill } from "react-quill";

import styles from "./QuilEditor.module.scss";
import { quillFormats, quillToolbar } from "./QuilEditorConfig";
import type QuilEditorProps from "./QuillEditorProps";

Quill.register({ "modules/imageCompress": imageCompressor }, true);

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// const { Quill } = dynamic(() => import('react-quill'), { ssr: false });
// const imageCompressor = dynamic(() => import('quill-image-compress'), {
//   ssr: false,
// });

const QuillEditor: FC<QuilEditorProps> = ({
  label,
  containerClass,
  error,
  helperText,
  setIsEditorValid,
  onEditorChange,
  ...rest
}) => {
  // useEffect(() => {
  //   (async () => {
  //     // const { Quill } = await import('react-quill');
  //     // const Quill = ReactQuill;
  //     Quill.register('modules/imageCompressor', imageCompressor);
  //   })();
  // }, []);
  return (
    <div
      className={`mep_quill_editor${
        containerClass ? ` ${containerClass}` : ""
      }`}
    >
      {label && <label className={styles.label}>{label} </label>}

      <div
        className={`${styles.container} ${
          containerClass || "transition duration-1000 ease-in-out"
        } ${error ? "border-red-500" : ""}`}
      >
        <ReactQuill
          theme="snow"
          {...rest}
          className="h-full min-h-[300px] w-full overflow-auto bg-[#F9FAFB]"
          modules={{
            toolbar: {
              container: quillToolbar,
            },
            imageCompress: {
              quality: 0.7, // default
              maxWidth: 700, // default
              maxHeight: 600, // default
              imageType: "image/jpeg", // default
              debug: true, // default
            },
          }}
          formats={quillFormats}
          preserveWhitespace
          bounds={".mep_quill_editor"}
          onChange={(v, _d, _s, e) => {
            onEditorChange(v);
            if (setIsEditorValid) {
              const isEditorValid = e.getLength() > 1 && e.getText() !== "\n";
              setIsEditorValid(isEditorValid);
            }
          }}
        />
      </div>

      {helperText && error && (
        <span
          className={`${styles.helper_text} ${error ? "text-red-600" : ""}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default QuillEditor;
