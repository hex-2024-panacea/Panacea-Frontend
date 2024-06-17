import Link from "next/link";
import {BorderOutlined, CheckOutlined, LoginOutlined} from "@ant-design/icons";

interface Props {
    Username: string;

}
export default function SideBar(props: Props) {
    return (
        <aside className="w-64 h-full">
            <div className="bg-primary-200 bg-t rounded-l">
                <div className="flex flex-col p-4 mb-4">
                    <div>
                        <BorderOutlined/>
                        <span className={"pl-1"}>{props.Username}</span>
                    </div>
                    <div className="flex flex-col pl-5">
                        <span className="flex justify-between">
                            <span>教練審核狀態</span>
                            <span>
                            <CheckOutlined />
                                已審核
                            </span>
                        </span>

                    </div>
                </div>
            </div>
            <div className="bg-primary-200 rounded-l">
                <div className="flex flex-col">
                    <div className="flex flex-col py-4 pl-4">
                        <div>
                            <BorderOutlined/>
                            <span className={'pl-1'}>學員中心</span>
                        </div>
                        <div className="flex flex-col pl-5">
                            <Link href='/user/account'>帳號設定</Link>
                            <Link href='/user/booking'>預約課程</Link>
                            <Link href='/user/purchased'>已購買課程</Link>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border-b border-dashed border-black"></div>
                    </div>
                    <div className="flex flex-col py-4 pl-4">
                        <div>
                            <BorderOutlined/>
                            <span className="pl-1">教練檔案</span>
                        </div>
                        <div className="flex flex-col pl-5">
                            <Link href='/profile/coach'>教練檔案</Link>
                            <Link href='/profile/course-manage'>課程管理</Link>
                            <Link href='/profile/course-list'>課程清單</Link>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border-b border-dashed border-black"></div>
                    </div>
                    <div className="flex flex-col py-4 pl-4">
                        <div>
                            <BorderOutlined/>
                            <span className="pl-1">系統管理員</span>
                        </div>
                        <div className="flex flex-col pl-5">
                            <Link href='/admin'>進入後台</Link>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border-b border-dashed border-black"></div>
                    </div>
                    <div className="py-4 pl-4">
                        <div>
                        <LoginOutlined />
                            <span className="pl-1">登出</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}