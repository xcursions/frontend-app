import Image from "next/image";
import React from "react";

const Whatsapp = () => {
  return (
    <div className=" fixed bottom-[20px] right-[20px] rounded-2xl bg-transparent shadow-lg xl:right-[5%] 2xl:right-[10%]">
      <a
        href={`https://wa.me/+2348168277417`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/whatsapp.png"
          width={50}
          height={50}
          alt="whatsapp chat button"
        />
      </a>
      <div></div>
    </div>
  );
};

export default Whatsapp;
