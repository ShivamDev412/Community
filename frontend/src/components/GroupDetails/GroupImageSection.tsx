import LazyLoadedImageComponent from "../LazyLoadedImageComponent";

const GroupImageSection = ({
  image,
  name,
  compressedImage,
}: {
  image: string | undefined;
  name: string | undefined;
  compressedImage: string | undefined;
}) => {
  return (
    <div className="h-auto w-full sm:w-1/2">
      <LazyLoadedImageComponent
        image={image}
        alt={`${name}_image`}
        compressedImage={compressedImage}
      />
    </div>
  );
};

export default GroupImageSection;
