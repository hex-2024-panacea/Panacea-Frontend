import { useState } from 'react';

export default function CourseTimetable() {
  const [dateSpan] = useState(getWeek());
  const timeSpan: Array<string> = [
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  function getWeek() {
    return [
      {
        date: '2024-03-04',
        weekday: 'SUN',
      },
      {
        date: '2024-03-05',
        weekday: 'MON',
      },
      {
        date: '2024-03-06',
        weekday: 'TUE',
      },
      {
        date: '2024-03-07',
        weekday: 'WED',
      },
      {
        date: '2024-03-08',
        weekday: 'THU',
      },
      {
        date: '2024-03-09',
        weekday: 'FRI',
      },
      {
        date: '2024-03-10',
        weekday: 'SAT',
      },
    ];
  }

  return (
    <div className="shadow-lg">
      <div className="">
        <div className="flex flex-row justify-center p-3">
          <div>
            <button>prev</button>
            <span>2024/3/24 - 2024/3/29</span>
            <button>next</button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center">
          <div className="min-w-[90px] border p-1"></div>
          {dateSpan.map((date: any, index: number) => (
            <>
              <div className="min-w-[120px] border bg-second-200 p-1" key={index}>
                {date.weekday}
              </div>
            </>
          ))}
        </div>
        <div>
          {timeSpan.map((time: any, idx: number) => (
            <>
              <div className="flex flex-row justify-center">
                <div className="min-w-[90px] border bg-second-200 p-1" key={idx}>
                  {time}
                </div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
                <div className="min-w-[120px] border p-1" key={idx}></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
