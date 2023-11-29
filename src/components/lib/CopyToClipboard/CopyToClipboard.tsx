import React from "react";
import toaster from "react-hot-toast";

import { CopyIcon } from "@/components/lib/Svg";

type Props = {
  text: string;
};
const CopyToClipboard = ({ text }: Props) => {
  function copyTextToClipboard() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toaster("Id has been copied to clipboard!");
      })
      .catch((error) => {
        toaster("Unable to copy:", error);
      });
  }
  return (
    <button onClick={copyTextToClipboard}>
      <CopyIcon />
    </button>
  );
};

export default CopyToClipboard;
