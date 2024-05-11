import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import useEventCalendar from "./useEventCalender";

const EventCalendar = () => {
  const {
    currentMonth,
    goToPreviousMonth,
    goToNextMonth,
    generateCalendarGrid,
  } = useEventCalendar();
  const { month, days } = generateCalendarGrid();

  return (
    <div className="border border-gray-400 rounded-lg p-10 hidden sm:block">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth}>
          <AiFillCaretLeft className="fill-cyan-700 h-8 w-8" />
        </button>
        <h3 className="text-lg font-semibold">{month}</h3>
        <button onClick={goToNextMonth}>
          <AiFillCaretRight className="fill-cyan-700 h-8 w-8" />
        </button>
      </div>
      <div>
        <div className="grid grid-cols-7 gap-2">
          <div className="text-center py-2 text-cyan-700">Sun</div>
          <div className="text-center py-2 text-cyan-700">Mon</div>
          <div className="text-center py-2 text-cyan-700">Tue</div>
          <div className="text-center py-2 text-cyan-700">Wed</div>
          <div className="text-center py-2 text-cyan-700">Thu</div>
          <div className="text-center py-2 text-cyan-700">Fri</div>
          <div className="text-center py-2 text-cyan-700">Sat</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className={`text-center py-2 ${
              day.month !== currentMonth.format("MMMM")
                ? "text-gray-400"
                : ""
            }`}
          >
            {day.dayOfMonth}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
