"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import UpcomingPaymentCard from "@/components/lib/UpcomingPaymentCard/UpcomingPaymentCard";
import { CardModal } from "@/Pages/wallet/cardModal/cardModal";
import { useGetUpcomingPaymentQuery } from "@/services/user/savingPlan";
import type UpcomingPaymentProps from "@/types/UpcomingPaymentProps";

const SavingPlan = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<UpcomingPaymentProps | null>(
    null
  );
  const { data, isSuccess } = useGetUpcomingPaymentQuery();

  const handleCardClick = (res: UpcomingPaymentProps) => {
    setSelectedCard(res);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };
  return (
    <div className="overflow-x-hidden bg-[#ffffff]">
      <div className="mx-[20px] lg:mx-[5px] xl:mx-[20px]">
        <div className="mb-[32px] mt-[30px] flex items-center gap-3 font-dmSansBold text-[24px] font-bold">
          <p onClick={router.back} className="cursor-pointer">
            <AiOutlineArrowLeft />
          </p>
          <p>Upcoming Payment</p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {isSuccess &&
              data.result.map((res: UpcomingPaymentProps) => (
                <div
                  key={res.id}
                  onClick={() => handleCardClick(res)}
                  className=" cursor-pointer"
                >
                  <UpcomingPaymentCard detailsData={res} view={true} />
                </div>
              ))}
          </div>
        </div>
        {selectedCard && (
          <CardModal cardDetails={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};
export default SavingPlan;
