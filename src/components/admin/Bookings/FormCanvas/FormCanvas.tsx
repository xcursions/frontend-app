import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";

import Heading from "@/components/lib/Heading";
import { CancelIcon } from "@/components/lib/Svg/CancelIcon";

import styles from "./FormCanvas.module.scss";
import type FormCanvasProps from "./FormCanvasProps";

const FormCanvas: FC<PropsWithChildren<FormCanvasProps>> = ({
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className={`${styles.background}`}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Heading type="h3">{title}</Heading>
          <span onClick={onClose}>
            <CancelIcon />
          </span>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default FormCanvas;
