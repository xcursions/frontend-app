import React from "react";

import Text from "@/components/lib/Text/Text";

import data from "./data";
import styles from "./Faq.module.scss";
import PostData from "./PostData";

const Faq = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className="content-center justify-center pb-[20px] pt-[58px]">
          <Text className="items-center justify-center text-center font-dmSansRegular text-[12px] text-[#0A83FF]">
            FAQS
          </Text>
          <Text className="items-center justify-center text-center font-dmSansBold text-[24px] text-[#101828] lg:text-[36px]">
            You’ve Got Questions? We Have Answers
          </Text>
        </div>
        <React.Fragment>
          {data.map(
            ({
              question,
              answer,
              id,
            }: {
              question: string;
              answer: string;
              id: number;
            }) => (
              <div className={styles.accordion} key={id}>
                <PostData question={question} answer={answer} id={id} />
              </div>
            )
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default Faq;
