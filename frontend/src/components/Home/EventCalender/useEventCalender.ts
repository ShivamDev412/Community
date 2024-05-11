import { useState } from "react";
import moment from "moment";

const useEventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const generateCalendarGrid = () => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const startDate = startOfMonth.clone().subtract(startOfMonth.day(), 'days');
    const daysAfterEndOfMonth = 6 - endOfMonth.day();
    const endDate = endOfMonth.clone().add(daysAfterEndOfMonth + 1, 'days');

    const days = [];
    let currentDate = startDate.clone();

    while (currentDate.isBefore(endDate, 'day')) {
      days.push({
        date: currentDate.format('YYYY-MM-DD'),
        dayOfMonth: currentDate.date(),
        month: currentDate.format('MMMM'),
      });
      currentDate.add(1, 'day');
    }

    return {
      month: currentMonth.format('MMMM YYYY'),
      days,
    };
  };

  return {
    currentMonth,
    goToPreviousMonth,
    goToNextMonth,
    generateCalendarGrid,
  };
};

export default useEventCalendar;
