import { BsTicketPerforatedFill } from "react-icons/bs";

const NoNewEvents = () => {
  return (
    <div className="flex items-center justify-center bg-white border border-gray-300 p-2 py-4 my-4 flex-col rounded-[0.2rem]">
      <BsTicketPerforatedFill className="h-7 w-7 fill-gray-500" />
      <h3 className="font-semibold text-gray-500">
        You have not registered for any events
      </h3>
      <p className="text-center text-gray-500">
        Events you have registered for will appear here.
      </p>
    </div>
  );
};
export default NoNewEvents;
