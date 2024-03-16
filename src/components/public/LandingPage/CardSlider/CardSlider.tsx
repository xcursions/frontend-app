"use client";

import "@/app/styles/swiper/swiper.css";
import "swiper/css/effect-fade";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AnimatedInView } from "@/components/lib/AnimatedInView";

type Props = {
  bannerImages?: {
    id: number | string;
    imageUrl: string;
  }[];
  classname?: string;
  wrapperClassname?: string;
};
const mockSlide = [
  {
    id: 1,
    imageUrl: "/assets/images/landing-page/cardslider1.png",
    title: "Start your visa application with ease",
    subtitle:
      "At Xcursions, we streamline the visa application process for you. Our expert team ensures accuracy and efficiency every step of the way, from document preparation to valuable insights.",
    button: "Get Started",
  },
  {
    id: 2,
    imageUrl: "/assets/images/landing-page/cardslider2.png",
    title: "Save & Travel On The Go",
    subtitle:
      "With convenient booking options and unparalleled customer service, we make exploring the world effortless. Start your adventure today.",
    button: "Book Flight",
  },
];
const CardSlider: React.FC<Props> = ({
  bannerImages = mockSlide,
  classname,
  wrapperClassname,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <div className="m-4">
      <Swiper
        slidesPerView="auto"
        effect="fade"
        spaceBetween={10}
        speed={900}
        loop={true}
        autoplay
        modules={[EffectFade, Autoplay]}
        onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
        className={`z-3 relative${wrapperClassname || ""}`}
      >
        {bannerImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="card_slider">
              <Image
                src={slide.imageUrl}
                className={`image h-[284px] w-full object-cover object-center md:w-[420px] lg:w-[533px]${
                  classname || ""
                }`}
                width={533}
                height={284}
                priority
                quality={100}
                alt="lead image banner"
              />
              <AnimatedInView>
                <div className="card_slider_text_wrapper">
                  <h3 className="card_slider_title">
                    {mockSlide[slideIndex]?.title}
                  </h3>
                  <p className="card_slider_subtitle">
                    {mockSlide[slideIndex]?.subtitle}
                  </p>
                  <Link
                    href="/"
                    className="card_slider_lead_cta secondaryDash text-[#ffffff]"
                  >
                    <span>{mockSlide[slideIndex]?.button}</span>
                  </Link>
                </div>
              </AnimatedInView>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
