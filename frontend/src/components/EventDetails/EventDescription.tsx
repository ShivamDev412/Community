const EventDescription = ({ description }: { description: string }) => {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">Details</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default EventDescription;
