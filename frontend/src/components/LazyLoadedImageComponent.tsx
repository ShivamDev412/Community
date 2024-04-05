import { FC, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadedImageComponentProps } from "@/Types";

const LazyLoadedImageComponent: FC<LazyLoadedImageComponentProps> = ({
  image,
  compressedImage,
  alt,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      {isImageLoaded ? (
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <img
          src={compressedImage}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
        />
      )}
      <img
        src={image}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: "none" }}
      />
    </>
  );
};

export default LazyLoadedImageComponent;
