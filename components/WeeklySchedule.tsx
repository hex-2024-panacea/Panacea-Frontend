import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekday);

interface TimeSlot {
  label: string;
  start: number;
  end: number;
}

interface WeeklyScheduleProps {
  data: any;
}

const WeeklySchedule = ({ data }: WeeklyScheduleProps) => {
  const [weekDates, setWeekDates] = useState<Dayjs[]>([]);

  useEffect(() => {
    const today = dayjs();

    const startOfWeekDate = today.startOf('week');

    const dates = Array.from({ length: 7 }, (_, i) => startOfWeekDate.add(i, 'day'));
    setWeekDates(dates);
  }, []);

  const timeSlots: TimeSlot[] = [
    { label: '上午', start: 6, end: 12 },
    { label: '下午', start: 12, end: 18 },
    { label: '傍晚', start: 18, end: 24 },
    { label: '深夜', start: 0, end: 6 },
  ];

  const isTimeSlotOccupied = (date: Dayjs, startHour: number, endHour: number): boolean => {
    if (!Array.isArray(data)) return false;

    return data.some((slot) => {
      const slotStart = dayjs(slot.startedAt);
      const slotEnd = dayjs(slot.endedAt);
      const timeSlotStart = date.hour(startHour);
      const timeSlotEnd = date.hour(endHour);

      return (
        slotStart.isSame(date, 'day') &&
        (timeSlotStart.isBetween(slotStart, slotEnd, null, '[]') ||
          timeSlotEnd.isBetween(slotStart, slotEnd, null, '[]') ||
          (slotStart.isSameOrBefore(timeSlotStart) && slotEnd.isSameOrAfter(timeSlotEnd)))
      );
    });
  };

  return (
    <div className="absolute right-[20px] z-20 rounded-lg bg-[#fff] p-4 shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-[#fff] p-2"></th>
            {weekDates.map((date, index) => (
              <th key={index} className="border border-[#fff] bg-[#F4F5F5] p-2">
                {dayjs().weekday(index).format('ddd')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, slotIndex) => (
            <tr key={slotIndex}>
              <td className="border border-[#fff] bg-[#F4F5F5] p-2 text-right">
                <p className="body">{slot.label}</p>
                <p className="small-body">{`${slot.start}:00-${slot.end}:00`}</p>
              </td>
              {weekDates.map((date, dateIndex) => (
                <td
                  key={dateIndex}
                  className={`border border-[#fff] p-2 ${
                    isTimeSlotOccupied(date, slot.start, slot.end) ? 'bg-[#BCE3FA]' : 'bg-[#FAFAFA]'
                  }`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 text-right">
        <button className="text-blue-500">瀏覽更多 &gt;</button>
      </div>
    </div>
  );
};

export default WeeklySchedule;
