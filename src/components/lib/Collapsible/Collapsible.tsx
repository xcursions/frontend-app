"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import ChevronIcon from "@/components/lib/Svg/ChevronIcon";

import type CollapsibleProps from "./CollapsibleProps";

/**
 * Collapsible Component.
 *
 * @component
 * @param {object} props - The properties of the Collapsible component.
 * @param {string} props.id - The id identifies a particullar collapsible section.
 * @param {string} props.title - The title of the collapsible section.
 * @param {string} props.open - The open state of the collapsible section.
 * @param {string} props.openStateHandler - callback function called on click of the header of the collapsible section.
 * @param {ReactNode} props.children - The content to be revealed or hidden.
 * @param {string} props.wrapperClassName - Wrapper className of the component.
 * @returns {JSX.Element} - The Collapsible component.
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  id,
  title,
  subtitle,
  open,
  openStateHandler,
  children,
  wrapperClassName,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(open);
  const [currentId, setCurrentId] = useState("");
  const [height, setHeight] = useState(open ? undefined : 0);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleCollapsibleHandler = useCallback(
    (currId: string) => {
      if (id && openStateHandler) openStateHandler(id);
      setIsOpen((prev) => !prev);
      setCurrentId(currId);
    },
    [id, openStateHandler]
  );
  const resizeHandler = useCallback(() => {
    if (ref.current && isOpen) {
      setHeight(ref.current.scrollHeight);
    }
  }, [isOpen]);

  useEffect(() => {
    // const resizeHandler = () => {
    //   if (ref.current && isOpen) {
    //     setHeight(ref.current.scrollHeight);
    //   } else {
    //     setHeight(0);
    //   }
    // };

    window.addEventListener("resize", resizeHandler);
    resizeHandler(); // Trigger initial height calculation

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isOpen, ref, resizeHandler]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Use MutationObserver to detect content changes
    if (ref.current) {
      const observer = new MutationObserver(resizeHandler);
      observer.observe(ref.current, { childList: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [ref, resizeHandler]);

  useEffect(() => {
    // Close any previously open component that is stateful
    if (!open && open !== undefined) {
      setIsOpen(false);
      setHeight(0);
      setCurrentId("");
    }
  }, [open]);

  useEffect(() => {
    // set the initial height when the component is open or controlled to be open
    if ((isOpen || open) && ref.current)
      setHeight(ref?.current.scrollHeight || 0);
    else setHeight(0);
  }, [isOpen, open]);

  if (!id) throw new Error("Collapsible component can't be used without an id");

  return (
    <div
      id={id}
      className={`mep-collapsible ${
        wrapperClassName ? ` ${wrapperClassName}` : ""
      }`}
    >
      <div
        onClick={() => toggleCollapsibleHandler(id)}
        className={`mep-collapsible_header`}
      >
        <div className="mep-collapsible_header_txt">
          <h4
            className={
              "txt-14 fw-700 mep-collapsible_header_txt_title mt-1 font-dmSansBold"
            }
          >
            {title}
          </h4>
          <p className={"txt-12 mep-collapsible_header_txt_subtitle"}>
            {subtitle}
          </p>
        </div>

        <div className={`mep-collapsible_icon`}>
          <button
            aria-label={`collapse button`}
            type="button"
            className={`mep-collapsible_icon_button rotate_center mt-1 ${
              (isOpen || open) && currentId === id ? " down" : ""
            }`}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>
      <div
        className={`mep-collapsible_content txt-14${
          isOpen && currentId === id ? " isOpen" : ""
        }`}
        style={{ minHeight: height }}
      >
        <div ref={ref}>{children}</div>
      </div>
    </div>
  );
};
