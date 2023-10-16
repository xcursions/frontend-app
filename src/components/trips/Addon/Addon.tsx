import React from "react";

type Props = {
  name: string;
  description: string;
  icon: string;
  cost: string;
  default: boolean;
};
const Addon = (info: Props) => {
  const colors = ["#CEE6FF", "#F5EBFF", "#E6FAF0", "#FFE7CE"];
  const index = Math.floor(Math.random() * colors.length);

  const cardStyle = {
    backgroundColor: colors[index],
    padding: "20px",
    borderRadius: "20px",
    margin: "10px",
    color: "#00000",
  };
  return (
    <div
      style={cardStyle}
      className="h-[189px] w-[340px] overflow-y-hidden lg:h-[230px] lg:w-[220px] xl:h-auto xl:min-h-[230px] xl:w-auto"
    >
      <div className="flex justify-between">
        <img src={info?.icon} alt={info?.name} className="h-[29px] w-[29px]" />
        {info.default === false && (
          <p className="rounded-3xl bg-[#23262F] p-2 text-[12px] text-[#ffffff]">
            ₦{parseInt(info?.cost, 10).toLocaleString()}
          </p>
        )}
      </div>

      <p className="mt-[12px] font-dmSansBold text-[14px]">{info?.name}</p>
      <p className="mt-[5px] text-[12px] text-[#23262F]">{info?.description}</p>
    </div>
  );
};

export default Addon;
