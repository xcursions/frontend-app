import toaster from "react-hot-toast";

import { CopyIcon } from "@/components/lib/Svg";

type Props = {
  icon?: any;
  link?: string;
  styles?: string;
  text?: string;
  textStyle?: string;
  type?: "copy" | "share";
  location?: "whatsapp" | "facebook" | "twitter" | "instagram";
};

export const HandleCopyLink = (props: Props) => {
  const linkToShare = props.link || window.location.href;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkToShare)
      .then(() => toaster.success("Link copied to clipboard!"))
      .catch((err) => toaster.error("Failed to copy link:", err));
  };
  const shareLink = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check out this link: "
    )}&url=${encodeURIComponent(linkToShare)}`;

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkToShare
    )}`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
      linkToShare
    )}`;

    switch (props.location) {
      case "twitter":
        return window.open(twitterUrl, "_blank");
      case "facebook":
        return window.open(facebookUrl, "_blank");
      case "whatsapp":
        return window.open(whatsappUrl, "_blank");
      case "instagram":
        return handleCopy();
      default:
        return handleCopy();
    }
  };
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={shareLink}
      //   onClick={props.type ? shareLink : handleCopy}
      className={props.styles || ""}
    >
      {<props.icon /> || <CopyIcon />}
      <span className={props.textStyle || ""}>{props?.text}</span>
    </div>
  );
};
