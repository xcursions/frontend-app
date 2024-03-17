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
    title: "Travel anywhere in the world, without taking on debt.",
    subtitle:
      "Xcursions makes saving for travel fun and effortless. Book more flights, take control of your finances, and start living life by your rules.",
    button: "Book a trip",
    link: "/trips",
  },
  {
    id: 2,
    imageUrl: "/assets/images/landing-page/slider2.png",
    title: "Let Your Wanderlust Take Flight. Cheap & Affordable flights",
    subtitle:
      "With convenient booking options and unparalleled customer service, we make exploring the world effortless. Start your adventure today.",
    button: "Book Flight",
  },
  {
    id: 3,
    imageUrl: "/assets/images/landing-page/slider3.png",
    title: "Discover Boundless Horizons with Xcursions",
    subtitle:
      ". Whether you're yearning for the allure of exotic destinations or seeking adventure in far-off lands, we're here to make your travel dreams a reality. Our commitment to excellence ensures that every step of your journey, from booking to touchdown, is seamless and memorable.",
    button: "Book custom trip",
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
              className={`lead_page_banner_img h-[60vh] min-w-full animate-zoom-in-img object-cover object-center lg:h-auto${
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
          <header className="text-center text-white">
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
