import Image from "next/image";
import bg from '../public/bg-search.svg';

const searchCourse: Array<object> = [
  {
    title: '利用不同篩選條件搜尋',
    description: '可以利用課程類別、上課時間，選擇你想要的課程，也可以在課程頁面看到教練資訊以及其他學員的評價。',
    bar: 'search',
  },
  {
    title: '彈性預約課程',
    description: '購買課程後，可以在教練行事曆上選擇有空的時間預約。預約成功後，會收到成功通知，並將課程加入學員的行事曆中。',
    bar: 'reserve',
  },
  {
    title: '任意地點上課',
    description: '課程時間到時，只要利用 Zoom 就可利用手機、電腦或是平板開啟課程，就可以開始上課。',
    bar: 'anywhere',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section 
      style={{ backgroundImage: `url(${bg.src})` }} 
      className="w-full h-[640px] bg-cover flex items-center justify-center gap-[130px] mb-[80px]"
      >
        <div>
          <div className="mb-[40px]">
            <h2 className="heading1 font-bold">尋找最適合你的課程</h2>
            <span className="heading6">讓我們陪著你尋找答案</span>
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="w-full p-[18px] rounded-[80px] border-[2px] border-primary-500"
              placeholder="請輸入想尋找的課程"
            />
            <button className="flex bg-primary-500 px-[16px] py-[8px] rounded-[80px] items-center absolute right-[8px] top-[50%] translate-y-[-50%]">
              <Image className="mr-[8px]" src="/icon-search.svg" alt="icon" width={20} height={20} />
              <span className="body text-[#fafafa]">搜尋</span>
            </button>
          </div>
        </div>
        <Image src="/web-search.svg" alt="icon" width={525} height={410} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 flex mb-[72px] justify-center">
          熱門
          <span className="text-primary-500">課程</span>
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <Image src="/test.png" alt="icon" width={1296} height={640} />
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 flex mb-[72px]">
          尋找最適合你的
          <span className="text-primary-500">課程</span>
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
        <ul className="flex flex-col gap-[40px]">
          {
            searchCourse.map((item, index) => (
              <li 
                className="pt-[64px] pb-[80px] rounded-[120px]"
                key={index} 
                style={{ background: index % 2 ? 'linear-gradient(90deg, rgba(23, 127, 172, 0) 0%, rgba(23, 127, 172, 0.1) 100%)' : 'linear-gradient(90deg, rgba(23, 127, 172, 0.1) 0%, rgba(23, 127, 172, 0) 100%)'}}
              >
                <h4 className="heading2 mb-[32px]">{item.title}</h4>
                <p className="heading5">{item.description}</p>
              </li>
            ))
          }
        </ul>
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 flex mb-[72px]">
          成為 Panacea 的
          <span className="text-primary-500">線上教練</span>
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
      </section>
      <section className="mb-[80px]">
        <h3 className="heading1 flex mb-[72px]">
          為什麼要選擇
          <span className="text-primary-500">Panacea</span>
          ？
          <Image className=" translate-y-[-15px] ml-[5px]" src="/decorate.svg" alt="icon" width={24} height={48} />
        </h3>
      </section>
    </main>
  );
}
