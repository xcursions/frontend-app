"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import GalleryViewer from "@/components/lib/GalleryViewer";
import OutingGallery from "@/components/lib/OutingGallery/OutingGallery";
import type { OutingProps } from "@/types";

import styles from "./EventDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};

const EventDetails = ({ detailsData }: Props) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setGalleryOpen(true);
  };
  const handleClose = () => {
    setGalleryOpen(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.back} onClick={router.back}>
          <AiOutlineArrowLeft />
          Go back Home
        </p>
        <div className={styles.card_container}>
          <div className={styles.image_container}>
            {detailsData.outingGallery[0] && (
              <OutingGallery
                coverImages={detailsData.outingGallery}
                handleOpen={handleOpen}
              />
            )}
          </div>
          <div></div>
        </div>
        <GalleryViewer
          galleryOpen={galleryOpen}
          handleClose={handleClose}
          unrefinedImage={detailsData.outingGallery}
          propertyForKey={"id"}
          propertyForSrc={"image"}
          pluginList={["Zoom", "Thumbnails", "Fullscreen"]}
          scenario="LightHouseOnly"
        />
      </div>
    </div>
  );
};

export default EventDetails;
