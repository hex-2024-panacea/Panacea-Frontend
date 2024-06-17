import CourseTimetable from "../(component)/CourseTimetable";
import {Select} from "antd";

export default function NewCoursePage() {
    return (
        <main>
            <div>
                <div className="my-5">
                    <div className="text-l text-primary-500">課程名稱</div>
                    <input type="text" className="border-2 border-gray-200 rounded-md px-1 py-1"/>
                </div>
                <div>
                    <div className="text-l text-primary-500">課程內容</div>
                    <textarea name="" id="" cols="30" rows="10" className="border-2"></textarea>
                </div>

                <div className="flex flex-row">
                    <div>
                        <div className="text-l text-primary-500">課程類型</div>
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
                        <div className="text-l text-primary-500">售否開放</div>
                        <div className="flex flex-row gap-1">
                            <button className="bg-primary-500 rounded-lg w-1/2 px-1 py-2">是</button>
                            <button className="bg-primary-500 rounded-lg w-1/2 px-1 py-2">否</button>
                        </div>
                    </div>

                    <div>
                        <div className="text-l text-primary-500">課堂價格</div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-l text-primary-500">授課時間</div>
                    <CourseTimetable/>
                </div>

                <div className="flex">
                    <button className="bg-primary-500 text-white rounded-md px-6 py-2">新增課程</button>
                </div>
            </div>
        </main>
    )
}