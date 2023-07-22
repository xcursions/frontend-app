import type { Key } from "react";
import { FaRegImages } from "react-icons/fa";

import styles from "./OutingGallery.module.scss";

const OutingGallery = ({ coverImages, handleOpen }: any) => {
  return (
    <div className={styles.image_card}>
      <div className={styles.top_image_container}>
        <img src={coverImages[0].image} alt="Top Image" />
        <button className={styles.see_more_button} onClick={handleOpen}>
          <FaRegImages />
          Show all Photos
        </button>
      </div>
      <div className={styles.grid_container}>
        {coverImages
          .slice(1, 4)
          .map(
            (
              image: { image: string | undefined },
              index: Key | null | undefined
            ) => (
              <div className={styles.grid_item} key={index}>
                <img src={image.image} alt={`Image ${index}`} />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default OutingGallery;
