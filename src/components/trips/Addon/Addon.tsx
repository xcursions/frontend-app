import React from "react";

type Props = {
  name: string;
  description: string;
  icon: string;
  cost: string;
};
const Addon = (info: Props) => {
  const colors = ["#CEE6FF", "#F5EBFF", "#E6FAF0"];
  const index = Math.floor(Math.random() * colors.length);

  const cardStyle = {
    backgroundColor: colors[index],
    padding: "20px",
    borderRadius: "20px",
    margin: "10px",
    color: "#00000",
  };
  console.log(info);
  return (
    <div
      style={cardStyle}
      className="h-[189px] w-[340px] lg:h-[223px] lg:w-[223px]"
    >
      <img src={info?.icon} alt={info?.name} className="h-[29px] w-[29px]" />
      <p className="mt-[15px] font-dmSansBold text-[14px]">{info?.name}</p>
      <p className="mt-[5px] text-[12px] text-[#23262F]">{info?.description}</p>
    </div>
  );
};

export default Addon;
