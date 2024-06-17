export default function CoachProfilePage() {
    return (
        <main>
            <div className="text-3xl mb-5">教練檔案</div>
            <div className="my-3">
                <h5 className="text-xl my-2">專業項目</h5>
                <div className="flex flex-row gap-3">
                    <span className="rounded-2xl border-2 px-5 py-1">飲食</span>
                    <span className="rounded-2xl border-2 px-5 py-1">飲食</span>
                    <span className="rounded-2xl border-2 px-5 py-1">飲食</span>
                </div>
            </div>
            <div className="my-3">
                <div className="text-xl my-2">學歷</div>
                <ul>
                    <li>123</li>
                    <li>123</li>
                    <li>123</li>
                </ul>
            </div>
            <div className="my-3">
                <div className="text-xl my-2">經歷</div>
                <ul>
                    <li>123</li>
                    <li>123</li>
                    <li>123</li>
                </ul>
            </div>
            <div className='my-3'>
                <div className="text-xl my-2">專業證照</div>
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-primary-200 w-[200px] h-[150px]"></div>
                    <div className="bg-primary-200 w-[200px] h-[150px]"></div>
                    <div className="bg-primary-200 w-[200px] h-[150px]"></div>
                    <div className="bg-primary-200 w-[200px] h-[150px]"></div>
                </div>
            </div>
            <div className="my-3 py-3">
                <div className="text-xl my-2">換款帳號</div>
                <span>(013)0987215364532</span>
                <button className='block rounded-sm border-2 px-2 py-1'>更新匯款銀行</button>
            </div>
        </main>
    )
}