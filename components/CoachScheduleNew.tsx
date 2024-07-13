'use client';

import React, { useState, useEffect } from 'react';
import { CourseSchedule } from '@/types/courses';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

interface CoachScheduleProps {
  data: CourseSchedule;
  sendCourseScheduleRange: (id: any) => void;
}

const CoachSchedule = ({ sendCourseScheduleRange }: CoachScheduleProps) => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const handleSendCourseScheduleRange = (id: any) => {
    sendCourseScheduleRange(id);
  };

  useEffect(() => {}, [currentWeek]);

  const weekStart = currentWeek.startOf('week');
  const weekEnd = currentWeek.endOf('week');

  const days = Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
  const hours = Array.from({ length: 18 }, (_, i) => i + 7); // 7:00 to 23:00

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = direction === 'prev' ? currentWeek.subtract(1, 'week') : currentWeek.add(1, 'week');
    setCurrentWeek(newWeek);

    // 不能切換到比當前日期以前的時間
    if (newWeek.isSameOrAfter(dayjs().startOf('week'))) {
      setCurrentWeek(newWeek);
    }
  };

  const resetToCurrentWeek = () => {
    setCurrentWeek(dayjs());
  };

  const handleTimeSlotClick = (day: dayjs.Dayjs, hour: number) => {
    const date = dayjs(day);
    const startTime = dayjs(date).add(hour, 'hour');
    const endTime = dayjs(date).add(hour + 1, 'hour');

    handleSendCourseScheduleRange({ startTime, endTime });
  };

  return (
    <div className="mx-auto">
      <h2 className="body mb-4 text-primary-500">授課時間</h2>
      <div className="w-[616px] rounded-[8px] p-[24px] shadow-[0_0_8px_0_#0000001A]">
        <div className="relative mb-4 flex items-center justify-center gap-[20px]">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2"
            disabled={currentWeek.isSame(dayjs().startOf('week'), 'week')}
          >
            &lt;&lt;
          </button>
          <span className="body">
            {weekStart.format('YYYY/M/D')} - {weekEnd.format('YYYY/M/D')}
          </span>
          <button onClick={() => navigateWeek('next')} className="p-2">
            &gt;&gt;
          </button>
          <button
            onClick={resetToCurrentWeek}
            className="absolute right-0 ml-4 rounded px-4 py-2 text-primary-500 transition-colors hover:text-primary-600"
          >
            今天
          </button>
        </div>
        <div className="bg-gray-200 grid grid-cols-[auto,repeat(7,70px)] gap-px overflow-x-auto">
          <div className="col-span-1"></div>
          {days.map((day) => (
            <div key={day.format()} className="bg-[#F4F5F5] text-center text-[#525252]">
              <p className="small-body">{day.format('ddd').toUpperCase()}</p>
              <p className="tiny-body">{day.format('M/D')}</p>
            </div>
          ))}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="flex w-[70px] items-center justify-center bg-[#F4F5F5] text-[#A3A3A3]">{`${hour}:00`}</div>
              {days.map((day) => {
                return (
                  <div
                    key={`${day.format()}-${hour}`}
                    className={`col-span-1 h-8 cursor-pointer border border-[#fff] bg-[#E5E5E5] hover:bg-[#d2d2d2]`}
                    onClick={() => handleTimeSlotClick(day, hour)}
                  ></div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachSchedule;
