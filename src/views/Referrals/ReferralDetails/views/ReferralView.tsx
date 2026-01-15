" use client";

import React, { useEffect, useState } from "react";
import toaster from "react-hot-toast";

import Heading from "@/components/lib/Heading";
import {
  CoinsIcon,
  CopyIcon,
  DiscountIcon,
  FacebookIcon,
  InstagramIcon,
  ShareIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { useGenerateReferalCodeMutation } from "@/services/user";
import { HandleCopyLink } from "@/utils/handleCopyLink";

import styles from "../Referral.module.scss";

const ReferralView = () => {
  const [referralLink, setReferralLink] = useState("");
  const [generateReferralCode] = useGenerateReferalCodeMutation();
  useEffect(() => {
    generateReferralCode()
      .unwrap()
      .then((data) =>
        setReferralLink(
          `${process.env.NEXT_PUBLIC_SITE_URL}/signup?referral-code=${data?.referralCode}`
        )
      )
      .catch((err) => toaster.error(err?.data?.meta?.message));
  }, []);
  return (
    <div className={styles.wrapper}>
      <div>
        <Heading className="text-[18px]">Refer Friends & Get a reward</Heading>
        <Text className="text-[14px] text-[#475467]">
          Refer a friend to excursion and you will both get a reward of 10k
        </Text>
        <div className="mt-[40px] flex max-w-[370px] cursor-pointer items-center justify-between rounded-3xl border p-3">
          <Text>{referralLink}</Text>
          <HandleCopyLink link={referralLink} icon={CopyIcon} />
        </div>
        <Text className="mt-[16px] text-[12px] text-[#98A2B3]">
          Send to your friends on your socials
        </Text>
        <div className="mt-3 flex gap-4">
          <HandleCopyLink
            link={referralLink}
            icon={FacebookIcon}
            location="facebook"
            type="share"
            styles="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#F2F4F7]"
          />
          <HandleCopyLink
            link={referralLink}
            icon={TwitterIcon}
            location="twitter"
            type="share"
            styles="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#F2F4F7]"
          />
          <HandleCopyLink
            link={referralLink}
            icon={InstagramIcon}
            location="instagram"
            type="share"
            styles="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#F2F4F7]"
          />
          <HandleCopyLink
            link={referralLink}
            icon={WhatsappIcon}
            location="whatsapp"
            type="share"
            styles="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#F2F4F7]"
          />
        </div>
        <hr className="my-[28px] max-w-[679px]" />
      </div>
      <div>
        <Heading className="text-[18px]">How it works</Heading>
        <div className="mb-[60px] mt-[20px] flex flex-col gap-[16px]">
          <div className=" flex items-center gap-[12px]">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#EBF5FF]">
              <ShareIcon />
            </div>
            <div className=" text-xs">
              <Text className="font-dmSansMedium text-[#344054]">
                Share Your Passion for Travel
              </Text>
              <Text className="text-[#667084]">
                Tell your friends why you love traveling with Xcursions.
              </Text>
            </div>
          </div>
          <div className=" flex items-center gap-[12px]">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#EBF5FF]">
              <DiscountIcon />
            </div>
            <div className=" text-xs">
              <Text className="font-dmSansMedium text-[#344054]">
                Exclusive Offer for Your Friend
              </Text>
              <Text className="text-[#667084]">
                Your friend gets a special offer on their first booking.
              </Text>
            </div>
          </div>
          <div className=" flex items-center gap-[12px]">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#EBF5FF]">
              <CoinsIcon />
            </div>
            <div className=" text-xs">
              <Text className="font-dmSansMedium text-[#344054]">
                Earn Your Rewards
              </Text>
              <Text className="text-[#667084]">
                Get Points when your friend completes their booking.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralView;
