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
    imageUrl: "/assets/images/landing-page/slider1.png",
    title: "Travel Freely, Explore Without Debt",
    subtitle:
      "Experience the liberating joy of debt-free travel with our “Pay small small” option. Save effortlessly and travel spontaneously, anytime, anywhere.",
    button: "Start Saving",
    link: "/user/wallet",
  },
  {
    id: 2,
    imageUrl: "/assets/images/landing-page/slider2.png",
    title: "Your Vacation, Your Way",
    subtitle:
      "Find your perfect holiday with us! Whether it's a romantic honeymoon, family vacation, solo adventure, specialized trip in wellness, wildlife, sports, or relaxation, we've got you covered.",
    button: "Book Now",
    link: "/trips",
  },
  {
    id: 3,
    imageUrl: "/assets/images/landing-page/slider3.jpeg",
    title: "Flight Convenience at Your Finger Tip",
    subtitle:
      "Enjoy seamless flight booking experiences, hassle-free reservations, and convenient planning for your next adventure.",
    button: "Book Now",
    link: "/custom-trip",
  },
];
export const ImageSlider: React.FC<Props> = ({
  bannerImages = mockSlide,
  classname,
  wrapperClassname,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // const srollToNextSection = () => {
  //   const bannerHeight =
  //     document.getElementById("lead_page_banner")?.offsetHeight ?? 0;
  //   window.scrollTo({
  //     top: bannerHeight,
  //     behavior: "smooth",
  //   });
  // };
  return (
    <div className="lead_page_banner" id="lead_page_banner">
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
            <Image
              src={slide.imageUrl}
              className={`lead_page_banner_img h-[60vh] min-w-full animate-zoom-in-img object-cover object-center lg:h-[85vh]${
                classname || ""
              }`}
              width={945}
              height={486}
              priority
              quality={100}
              alt="lead image banner"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <AnimatedInView>
        <div className="lead_page_banner__txt">
          <header className=" text-white">
            {/* <span className="lead_tagline">{currentNav?.pageTitleTag}</span> */}
            <h1 className="lead_title">{mockSlide[slideIndex]?.title}</h1>
            <p className="lead_subtitle">{mockSlide[slideIndex]?.subtitle}</p>
            <Link
              href={(mockSlide[slideIndex]?.link as string) || "/"}
              className="lead_cta secondaryDash"
            >
              <span>{mockSlide[slideIndex]?.button}</span>
            </Link>
          </header>
        </div>
      </AnimatedInView>
      {/* <button
        className="lead_page_banner__scroll_down"
        onClick={srollToNextSection}
      >
        <MouseIcon />

      </button> */}
      {/* <Search /> */}
    </div>
  );
};
