import React from 'react';
import dayjs from 'dayjs';

interface RecurrenceSchedule {
  startedAt: string;
  endedAt: string;
}

interface WeeklyScheduleProps {
  data: RecurrenceSchedule[];
}

const WeeklySchedule = ({ data }: WeeklyScheduleProps) => {
  const timeSlots = ['上午', '下午', '傍晚', '深夜'];
  const timeRange = ['06:00~12:00', '12:00~18:00', '18:00~24:00', '00:00~06:00'];

  const getTimeSlotIndex = (hour: number) => {
    if (hour >= 6 && hour < 12) return 0;
    if (hour >= 12 && hour < 18) return 1;
    if (hour >= 18 && hour < 24) return 2;
    if (hour >= 0 && hour < 6) return 3;
    return -1;
  };

  const renderTimeSlots = () => {
    const slots = Array(4)
      .fill(null)
      .map(() => Array(7).fill(false));

    data.forEach((schedule) => {
      const start = dayjs(schedule.startedAt);
      const end = dayjs(schedule.endedAt);

      for (let d = start.day(); d <= end.day(); d++) {
        const startIndex = d === start.day() ? getTimeSlotIndex(start.hour()) : 0;
        const endIndex = d === end.day() ? getTimeSlotIndex(end.hour()) : 3;

        for (let i = startIndex; i <= endIndex; i++) {
          slots[i][d] = true;
        }
      }
    });

    return slots.map((day, i) => (
      <div key={i} className="flex">
        <div className="flex h-16 w-16 items-center justify-center border">
          {timeSlots[i]}
          <div className="text-xs">{timeRange[i]}</div>
        </div>
        {day.map((booked, j) => (
          <div key={j} className={`h-16 w-16 border ${booked ? 'bg-blue-200' : 'bg-white'}`}></div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <div className="h-16 w-16"></div>
        {['週日', '週一', '週二', '週三', '週四', '週五', '週六'].map((day) => (
          <div key={day} className="flex h-16 w-16 items-center justify-center border font-bold">
            {day}
          </div>
        ))}
      </div>
      {renderTimeSlots()}
    </div>
  );
};

export default WeeklySchedule;
