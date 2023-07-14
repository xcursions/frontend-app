import { AiFillEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { TbBuildingBank } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

import styles from "./wallet.module.scss";

const Wallet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pl-2 pt-[40px] font-dmSansBold text-[24px] text-[#101828] lg:pl-[31px]">
          Wallet
        </Heading>
        <Text className="pl-2 text-[14px] text-[#667084] lg:pl-[31px] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className="flex flex-col gap-[25px] lg:flex-row">
          <div className={styles.horizontal_div}>
            <div className=" absolute z-50 mx-auto items-center pb-[31px] pl-[40px] pt-[33px]">
              <Text className="text-[14px] text-[#FFFFFF] lg:text-[16px]">
                Total balance
              </Text>
              <div className="mt-[8px] flex items-center gap-3">
                <Text className="text-[24px]  text-[#FFFFFF] lg:text-[30px]">
                  ₦0
                </Text>
                <AiFillEye className="text-[30px]" />
              </div>
              <div className="mt-[30px] flex items-center gap-3">
                <Button className="flex items-center gap-3 rounded-3xl bg-[#FFFFFF] text-[#0A83FF]">
                  <span>
                    <FaPlus />
                  </span>
                  Fund Wallet
                </Button>
                <div className="rounded-full bg-black p-3 text-xl text-white">
                  <SlOptions />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[345px] rounded-3xl border bg-[#E4E7EC] lg:w-[286px]">
            <div className=" my-[36px] pl-[40px] lg:pl-0">
              <div className="mb-3 max-h-[50px] max-w-[50px] rounded-full bg-[#CEE6FF] p-3 text-[28px] text-[#0A83FF] lg:mx-auto">
                <TbBuildingBank />
              </div>
              <Text className="text-[14px] text-[#667084] lg:mx-auto lg:text-center">
                Saving Plan
              </Text>
              <Text className="font-dmSansBold text-[30px] text-[#0A83FF] lg:text-center">
                0
                <span className="font-dmSansMedium text-[16px] text-[#667084]">
                  /Month
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
