/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
export const quillToolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  [{ header: 2 }, "link", "blockquote"], // custom button values
  ["image"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: "" }, { align: "center" }, { align: "right" }],

  ["clean"], // remove formatting button

  [{ font: [] }],
  [{ header: [2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
];

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
