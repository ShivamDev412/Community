import { useState } from "react";

const GroupDescription = ({ about }: { about: string }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <h3 className="font-bold text-xl mb-4">What we’re about</h3>
      <p>{showMore ? about : about.slice(0, 105)}</p>
      {!showMore && about.length > 50 && (
        <button
          onClick={toggleShowMore}
          className="text-cyan-500 hover:underline focus:outline-none mt-2 text-sm"
        >
          Read more
        </button>
      )}
    </div>
  );
};

export default GroupDescription;
