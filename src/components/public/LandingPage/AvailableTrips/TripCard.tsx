import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import type OutingProps from "@/types/OutingProps";
import { countries } from "@/utils/countryCode";

type Props = {
  post: OutingProps;
};
const TripCard = ({ post }: Props) => {
  const featuredImage = post.outingGallery.find(
    (item: { featured: any }) => item.featured
  );
  const price = () => {
    if (post?.subType === "group") {
      return post?.outingChargePlan?.costGroup;
    }
    return post?.outingChargePlan?.cost;
  };
  const getCountryCode = (countryName: string) => {
    const countryEntries = Object.entries(countries);

    const foundEntry = countryEntries.find(
      ([_code, name]) => name === countryName
    ); // Find the matching entry

    return foundEntry ? foundEntry[0] : null; // Return the country code if found, otherwise null
  };
  const countryCode = getCountryCode(post?.outingDestination?.country);
  return (
    <div className="xcursions_tripcard">
      <Link
        href={`/${post.type === "tour" ? "trips" : "events"}/${post.id}`}
        key={`${post.id}`}
      >
        <Image
          className="xcursions_tripcard_image"
          width={290}
          height={222}
          src={
            (featuredImage && featuredImage.image) ||
            post.outingGallery?.[0]?.image
          }
          alt={post.name}
        />
      </Link>
      <div className="xcursions_tripcard_icon">
        <AiOutlineHeart className="text-lg" />
      </div>
      <div className="xcursions_tripcard_type">
        {post.type === "tour" && post?.subType === "private"
          ? "personalized"
          : post.type === "tour" && post?.subType}{" "}
        {post.type === "tour" ? "Trip" : null}
      </div>
      <Link
        href={`/${post.type === "tour" ? "trips" : "events"}/${post.id}`}
        key={`${post.id}`}
      >
        <div>
          <p className="xcursions_tripcard_name">{post?.name}</p>
          {post.type === "tour" ? (
            <p className="xcursions_tripcard_country">
              <img
                alt="United States"
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
              />
              {post?.outingDestination?.country}
            </p>
          ) : (
            <p className="xcursions_tripcard_country">
              {formatedDate(post.outingDate[0].startDate)}
            </p>
          )}
          <p className="xcursions_tripcard_price">
            {`₦${parseInt(price(), 10).toLocaleString()}`}
            {post.type === "tour" ? (
              <>
                {" "}
                <span className="ml-2 text-[#FF860A]">★</span>
                <span>4.9</span>{" "}
              </>
            ) : null}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TripCard;
