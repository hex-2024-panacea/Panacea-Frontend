import {Select} from "antd";
import CourseCard from "@/app/profile/(component)/CourseCard";
import Link from "next/link";
interface Coruse {
    id: string,
}
interface CourseList {

}
const courseList: CourseList[] = [
    {
        id: 1
    },
    {
        id: 2
    },
]

export default function CourseManagerPage() {
    return (
        <main>
            <div className="text-3xl">課程管理</div>
            <div className="flex flex-row gap-4 my-5">
                <Select
                    defaultValue=""
                    style={{width: 160}}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    options={[
                        {
                            value: '',
                            label: '課程狀態'
                        },
                    ]}
                />
                <Select
                    defaultValue=""
                    style={{width: 160}}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    options={[
                        {
                            value: '',
                            label: '課程排序'
                        },
                    ]}
                />
                <button className="text-[#ffffff] bg-primary-500 rounded-md px-3 py-1">
                    <Link href="/profile/new-course">新增課程</Link>
                </button>
            </div>
            <div className="grid grid-cols-3 gap-5 my-10">
                <CourseCard />
            </div>
        </main>
    )
}