// FUNCTION TO HANDLE UPLOADS IN THE EDITOR COMPONENT
// import { uploadFile } from '../firebase/storage';

// const uploadCallback = (file: File) =>
//   uploadFile({ file }).then((response) => {
//     return { data: { link: response } };
//   });

export const customStyleMap = {
  BOLD: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: "bold",
  },
};

export const toolbar = {
  options: [
    "inline",
    "textAlign",
    "list",
    "blockType",
    "image",
    "link",
    "history",
  ],
  blockType: {
    inDropdown: false,
    options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
  },
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  list: {
    inDropdown: false,
    options: ["unordered", "ordered", "indent", "outdent"],
  },
  textAlign: {
    inDropdown: false,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    dropdownClassName: "link-dropdown",
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    // uploadCallback,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: true, mandatory: true },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"],
  },
  maxNesting: 1,
  whitespacedCharacters: ["\n", "\t", "📷"],
};
