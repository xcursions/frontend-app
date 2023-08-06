import Image from "next/image";
import React from "react";

import Button from "@/components/lib/Button/Button";
import Text from "@/components/lib/Text/Text";

const Main = () => {
  return (
    <div className="w-full px-5 py-[58px]">
      <div className="relative mx-auto max-w-[1241px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:px-[59px]">
          <div className="">
            <Text className="max-w-[410px] font-dmSansBold text-[24px] font-bold text-[#101828] lg:text-[36px]">
              A little About{" "}
              <span className="rounded text-[#0A83FF] shadow-md">Xcursion</span>{" "}
              & what you are doing
            </Text>
          </div>
          <div>
            <Text className="text-[16px] font-normal text-[#667084]">
              Suspendisse enim elit consequat volutpat. Lectus vitae eget
              aliquet egestas dis. Sem nunc at enim dui in felis in vel. Ut
              purus gravida mattis sit mi donec. Odio eleifend nisi congue
              egestas. Nisl sollicitudin dictum cras sit consequat velit amet.
              Risus quis purus tempor aliquet pharetra turpis. In lacinia
              imperdiet urna mauris. Nibh et ipsum sed eget tortor et
              ullamcorper non scelerisque. Natoque molestie integer posuere
              molestie in id sagittis facilisis. Adipiscing in tortor sem cras
              ultrices nunc id. Volutpat sed mauris fames diam pulvinar arcu
              elit. Urna imperdiet dui aenean augue elementum fermentum.
              Elementum luctus sed sit massa risus orci.
            </Text>
            <div className="mt-[32px] flex gap-3">
              <Image
                src={"/assets/images/about/about_1.png"}
                alt="about us at xcursions"
                width={500}
                height={500}
                className="w-[157px] lg:w-[287px]"
              />
              <Image
                src={"/assets/images/about/about_2.png"}
                alt="about us at xcursions"
                width={500}
                height={500}
                className="w-[157px] lg:w-[287px]"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto mt-[59px] max-w-[1014px] rounded-xl border p-5 shadow-md lg:mt-[100px] lg:p-[40px]">
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
              <div>
                <Text className="text-[24px] font-bold">
                  You have something unique
                </Text>
                <Text className="max-w-[610px] text-[14px] text-[#667084]">
                  Suspendisse enim elit consequat volutpat. Lectus vitae eget
                  aliquet egestas dis. Sem nunc at enim dui in felis in vel. Ut
                  purus gravida mattis sit mi donec.
                </Text>
              </div>
              <Button className="w-full rounded-3xl md:w-auto">Join Us</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
