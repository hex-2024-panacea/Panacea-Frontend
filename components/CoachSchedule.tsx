import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface Booking {
  startTime: string;
  endTime: string;
}

interface ScheduleData {
  available: Booking[];
  booked: Booking[];
}

interface ScheduleProps {
  data: ScheduleData;
}

const Schedule = ({ data }: ScheduleProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('week').add(1, 'day'));

  const handlePrevWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, 'week'));
  };

  const renderTimeSlots = (day: dayjs.Dayjs) => {
    const hours = [];
    for (let i = 7; i <= 11; i += 0.5) {
      const time = day.hour(Math.floor(i)).minute((i % 1) * 60);
      const isBooked = data.booked.some((booking) =>
        time.isBetween(dayjs(booking.startTime), dayjs(booking.endTime), 'minute', '[)'),
      );
      hours.push(
        <div key={time.format()} className={`h-8 w-16 border ${isBooked ? 'bg-blue-200' : 'bg-white'}`}>
          {time.format('HH:mm')}
        </div>,
      );
    }
    return hours;
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = currentWeekStart.add(i, 'day');
      days.push(
        <div key={day.format()} className="flex flex-col items-center">
          <div className="font-bold">{day.format('ddd MM/DD')}</div>
          {renderTimeSlots(day)}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-60 justify-between">
        <button onClick={handlePrevWeek} className="bg-gray-200 rounded p-2">
          Prev Week
        </button>
        <button onClick={handleNextWeek} className="bg-gray-200 rounded p-2">
          Next Week
        </button>
      </div>
      <div className="flex w-full justify-around">{renderDays()}</div>
    </div>
  );
};

export default Schedule;
