"use client";

import "@/app/styles/swiper/swiper.css";
import "swiper/css/effect-fade";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AnimatedInView } from "@/components/lib/AnimatedInView";
import Loader from "@/components/lib/Loader";
import { useGetAllBannerQuery } from "@/services/admin";

type Props = {
  bannerImages?: {
    id: number | string;
    imageUrl: string;
  }[];
  classname?: string;
  wrapperClassname?: string;
};

const CardSlider: React.FC<Props> = ({ classname, wrapperClassname }) => {
  const { data, isSuccess } = useGetAllBannerQuery();
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
        className={`z-3 relative${wrapperClassname || ""}`}
      >
        {isSuccess ? (
          data.result
            .filter((e: any) => e.status === "published")
            .map((slide: any) => (
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
                      <h3 className="card_slider_title">{slide.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: slide.description,
                        }}
                        className="card_slider_subtitle"
                      />
                      <Link
                        href="/"
                        className="card_slider_lead_cta secondaryDash text-[#ffffff]"
                      >
                        <span>Get Started</span>
                      </Link>
                    </div>
                  </AnimatedInView>
                </div>
              </SwiperSlide>
            ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default CardSlider;
