/* eslint-disable import/no-extraneous-dependencies */
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

function GalleryViewer({
  galleryOpen,
  handleClose,
  unrefinedImage,
  propertyForSrc,
  propertyForKey,
  pluginList,
  scenario,
}: any) {
  const [index, setIndex] = useState(-1);
  const transformGallery = (images: { [x: string]: any }[]) => {
    return images.map((image: { [x: string]: any }) => ({
      src: image[propertyForSrc],
      key: image[propertyForKey],
      height: 1080,
      width: 1024,
    }));
  };
  const pluginImports = pluginList.map((plugin: any) => {
    switch (plugin) {
      case "Zoom":
        return import("yet-another-react-lightbox/plugins/zoom");
      case "Thumbnails":
        return import("yet-another-react-lightbox/plugins/thumbnails");
      case "Fullscreen":
        return import("yet-another-react-lightbox/plugins/fullscreen");
      default:
        return null;
    }
  });

  const [plugins, setPlugins] = useState<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const displayScenario = (scenario: any) => {
    switch (scenario) {
      case "LightHouseOnly":
        return (
          <Lightbox
            open={galleryOpen}
            close={handleClose}
            slides={transformGallery(unrefinedImage)}
            plugins={plugins}
          />
        );
      case "PhotoAlbum":
        return (
          <>
            <PhotoAlbum
              layout="rows"
              photos={transformGallery(unrefinedImage)}
              targetRowHeight={150}
              // eslint-disable-next-line @typescript-eslint/no-shadow
              onClick={({ index }) => {
                setIndex(index);
              }}
            />
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={transformGallery(unrefinedImage)}
              plugins={plugins}
            />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    Promise.all(pluginImports)
      .then((importedModules: any[]) => {
        const validPlugins = importedModules.filter(
          (module) => module && module.default
        );
        setPlugins(validPlugins.map((module) => module.default));
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error while importing plugin : ${error}`));
  }, []);

  return displayScenario(scenario);
}

export default GalleryViewer;
