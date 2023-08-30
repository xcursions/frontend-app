"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import styles from "./Faq.module.scss";

const PostData = ({
  question,
  answer,
  id,
}: {
  id: number;
  question: string;
  answer: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.accordion} key={id}>
      <div
        className={styles.accordion_title}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <div className=" text-[16px] text-[#101828]">
          <h3>{question}</h3>
        </div>
        <div className="text-[#0A83FF]">
          {isActive ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      {isActive && (
        <div className={styles.accordion_content}>
          {" "}
          <p
            dangerouslySetInnerHTML={{
              __html: answer.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostData;
