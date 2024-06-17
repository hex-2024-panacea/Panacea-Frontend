interface CourseList {
    id: string;
    imgSrc: string;
    title: string;
    rating: number;
    commentsNum: number;
    recurrenceSchedules: { startedAt: string, endedAt: string }[];
    description: string;
}

const coursesList: CourseList[] = [
    {
        id: '2404221530',
        imgSrc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '合一覺醒授證課程',
        rating: 4.8,
        commentsNum: 1500,
        recurrenceSchedules: [
            {
                startedAt: '2000-01-02T00:00:00.000+08:00',
                endedAt: '2000-01-02T00:30:00.000+08:00',
            },
            {
                startedAt: '2000-01-02T11:00:00.000+08:00',
                endedAt: '2000-01-02T14:00:00.000+08:00',
            },
            {
                startedAt: '2000-01-02T19:00:00.000+08:00',
                endedAt: '2000-01-03T00:30:00.000+08:00',
            },
            {
                startedAt: '2000-01-03T10:00:00.000+08:00',
                endedAt: '2000-01-03T12:00:00.000+08:00',
            },
        ],
        description: '社會充滿好壞對錯、評判和制約，我們甚至受控於錯誤的信念與制約，遵循著看似可以成功，卻從未帶給我們喜悅快樂的規條、準則。如何跳脫錯誤的信念崇拜，重新活出一個喜悅、豐盛，並且對社會有貢獻的人，是現代人最重要的議題！透過尊者阿瑪巴關(Sri Amma Bhagavan)的智慧教導，幫助你跳脫頭腦的思維，活出你生命的豐盛、喜悅和自由！',
    },
    {
        id: '2404221530',
        imgSrc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '合一覺醒授證課程',
        rating: 4.8,
        commentsNum: 1500,
        recurrenceSchedules: [
            {
                startedAt: '2000-01-02T00:00:00.000+08:00',
                endedAt: '2000-01-02T00:30:00.000+08:00',
            },
            {
                startedAt: '2000-01-02T11:00:00.000+08:00',
                endedAt: '2000-01-02T14:00:00.000+08:00',
            },
            {
                startedAt: '2000-01-02T19:00:00.000+08:00',
                endedAt: '2000-01-03T00:30:00.000+08:00',
            },
            {
                startedAt: '2000-01-03T10:00:00.000+08:00',
                endedAt: '2000-01-03T12:00:00.000+08:00',
            },
        ],
        description: '社會充滿好壞對錯、評判和制約，我們甚至受控於錯誤的信念與制約，遵循著看似可以成功，卻從未帶給我們喜悅快樂的規條、準則。如何跳脫錯誤的信念崇拜，重新活出一個喜悅、豐盛，並且對社會有貢獻的人，是現代人最重要的議題！透過尊者阿瑪巴關(Sri Amma Bhagavan)的智慧教導，幫助你跳脫頭腦的思維，活出你生命的豐盛、喜悅和自由！',
    },
]


export default function CourseCard(course: CourseList[]) {
    return (
        <div className="inline-grid w-[300px] rounded-l border-gray-200 border-2">
            <div className="min-h-[240px] max-h-full bg-primary-200" >
                <div className="w-full bg-gray-200">
                </div>
            </div>
            <div className="p-3">
                <span className="text-2xl font-bold">快樂飲食</span>
                <ul>
                    <li>
                        學員 user1
                    </li>
                    <li>
                        預約日期 2024/01/01
                    </li>
                    <li>
                        預約時間 19:30~20:30
                    </li>
                    <li>
                        課程狀態 尚未開始
                    </li>
                </ul>

            </div>
        </div>
    )
}