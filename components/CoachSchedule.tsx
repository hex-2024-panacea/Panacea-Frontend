'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface ScheduleData {
  available: TimeSlot[];
  booked: TimeSlot[];
}

const WeeklySchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    available: [],
    booked: [],
  });

  useEffect(() => {
    setScheduleData({
      available: [
        { startTime: '2024-07-02T14:00:00Z', endTime: '2024-07-02T16:00:00Z' },
        { startTime: '2024-07-05T14:00:00Z', endTime: '2024-07-05T16:00:00Z' },
        { startTime: '2024-07-08T14:00:00Z', endTime: '2024-07-08T16:00:00Z' },
        { startTime: '2024-03-29T14:00:00Z', endTime: '2024-03-29T16:00:00Z' },
      ],
      booked: [
        { startTime: '2024-07-03T09:00:00Z', endTime: '2024-07-03T12:00:00Z' },
        { startTime: '2024-07-03T18:00:00Z', endTime: '2024-07-03T20:00:00Z' },
        { startTime: '2024-07-02T14:00:00Z', endTime: '2024-07-02T16:00:00Z' },
        { startTime: '2024-07-08T18:00:00Z', endTime: '2024-07-08T20:00:00Z' },
        { startTime: '2024-03-28T18:00:00Z', endTime: '2024-03-28T20:00:00Z' },
      ],
    });
  }, [currentWeek]);

  const weekStart = currentWeek.startOf('week');
  const weekEnd = currentWeek.endOf('week');
  const days = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));

  const hours = Array.from({ length: 18 }, (_, i) => i + 7); // 7:00 to 23:00

  const isTimeSlotBooked = (day: dayjs.Dayjs, hour: number) => {
    const slotStart = day.hour(hour).minute(0).second(0);
    const slotEnd = slotStart.add(1, 'hour');
    return scheduleData.booked.some((slot) => {
      const bookingStart = dayjs(slot.startTime);
      const bookingEnd = dayjs(slot.endTime);
      return (
        slotStart.isBetween(bookingStart, bookingEnd, null, '[]') ||
        slotEnd.isBetween(bookingStart, bookingEnd, null, '[]')
      );
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek((prev) => prev.add(direction === 'prev' ? -1 : 1, 'week'));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => navigateWeek('prev')} className="p-2 text-2xl font-bold">
          &lt;
        </button>
        <span className="text-lg font-semibold">
          {weekStart.format('YYYY/MM/DD')} - {weekEnd.format('YYYY/MM/DD')}
        </span>
        <button onClick={() => navigateWeek('next')} className="p-2 text-2xl font-bold">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-8 gap-1">
        <div className="col-span-1"></div>
        {days.map((day) => (
          <div key={day.format()} className="col-span-1 text-center font-semibold">
            {day.format('ddd')}
            <br />
            {day.format('MM/DD')}
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="col-span-1 pr-2 text-right">{`${hour}:00`}</div>
            {days.map((day) => (
              <div
                key={`${day.format()}-${hour}`}
                className={`col-span-1 h-8 border ${isTimeSlotBooked(day, hour) ? 'bg-[#BCE3FA]' : 'bg-[#fff]'}`}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
