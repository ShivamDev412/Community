const GroupImageSection = ({
  image,
  name,
}: {
  image: string | undefined;
  name: string | undefined;
}) => {
  return (
    <div className="h-auto w-full sm:w-1/2">
      <img
        src={image}
        alt={`${name}_image`}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default GroupImageSection;
