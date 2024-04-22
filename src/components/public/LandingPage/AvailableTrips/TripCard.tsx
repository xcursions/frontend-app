import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import toaster, { toast } from "react-hot-toast";
import { AiOutlineHeart } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import { useAppSelector } from "@/hooks";
import {
  useCreateOutingLikeMutation,
  useDeleteOutingLikeMutation,
  useLazyGetOutingLikeQuery,
} from "@/services/user";
import type OutingProps from "@/types/OutingProps";
import { countries } from "@/utils/countryCode";

type Props = {
  post: OutingProps;
};
const TripCard = ({ post }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const [getLikeData, { data: likedData }] = useLazyGetOutingLikeQuery();
  const [deleteLike] = useDeleteOutingLikeMutation();
  const [createLike] = useCreateOutingLikeMutation();
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
    );

    return foundEntry ? foundEntry[0] : null; // Return the country code if found, otherwise null
  };
  const countryCode = getCountryCode(post?.outingDestination?.country);
  const handleLike = () => {
    if (user) {
      createLike({ query: post.id, data: { liked: true } })
        .unwrap()
        .then(() => {
          toaster.success("Outing has been added to your favorites");
        })
        .catch(() => toast.error("Sorry an error occurred"));
    } else {
      toaster.error("You need to be signed in");
    }
  };
  const handleRemoveLiked = (id: string) => {
    if (user) {
      deleteLike(id)
        .unwrap()
        .then(() =>
          toaster.success("Outing has been removed from your favorites")
        )
        .catch(() => toast.error("Sorry an error occurred"));
    }
  };
  useEffect(() => {
    if (user) {
      getLikeData("?limit=50");
    }
  }, []);
  const likedDataObject = likedData
    ? likedData?.result.find((item: any) => item?.outing?.id === post.id)
    : null;
  return (
    <div className="xcursions_tripcard">
      <Link
        href={`/${post.type === "tour" ? "trips" : "events"}/${post.id}`}
        key={`${post.id}`}
      >
        <Image
          className="xcursions_tripcard_image object-cover"
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
        {likedData?.result.some((res: any) => post.id === res.outing.id) ? (
          <MdFavorite
            className="text-lg text-red-600"
            onClick={() => handleRemoveLiked(likedDataObject.id)}
          />
        ) : (
          <AiOutlineHeart className="text-lg" onClick={handleLike} />
        )}
      </div>
      {pathname === "/" ? (
        <div className="xcursions_tripcard_type">
          {post.type === "tour" && post?.subType === "private"
            ? "personalized"
            : post.type === "tour" && post?.subType}{" "}
          {post.type === "tour" ? "Trip" : null}
        </div>
      ) : null}
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
