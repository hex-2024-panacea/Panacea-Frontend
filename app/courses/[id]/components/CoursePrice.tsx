'use client';
import { setCoursePurchase } from '@/app/api/course-purchase';
import { CoursePriceProps, PurchasePostData, PaymentData } from '@/types/purchase';

const generateFormData = (paymentData: PaymentData): FormData => {
  const { merchantId, tradeInfo, tradeSha, version } = paymentData;
  const formData = new FormData();
  formData.append('MerchantID', merchantId);
  formData.append('TradeInfo', tradeInfo);
  formData.append('TradeSha', tradeSha);
  formData.append('Version', version);
  return formData;
};

const fetchPaymentData = async (postData: PurchasePostData) => {
  const res = await setCoursePurchase(postData);
  return res.data;
};

const CoursePrice: React.FC<CoursePriceProps> = ({ coursePrice, courseId, name }) => {
  // 取得購買資訊
  const getPaymentData = async (data: { count: number; price: number }) => {
    const postData: PurchasePostData = {
      courseId,
      name,
      price: data.price,
      amount: data.count,
    };
    const paymentData: PaymentData = await fetchPaymentData(postData);
    sendPaymentRequest(paymentData);
  };

  // 提交交易資訊 -> 藍新金流
  const sendPaymentRequest = (paymentData: PaymentData) => {
    // TODO: 等 vercel 設定完成後，將 paymentUrl 改為正確的網址
    // const paymentUrl = process.env.NEXT_PUBLIC_NEWEBPAY_API_URL || '';
    const paymentUrl = 'https://ccore.newebpay.com/MPG/mpg_gateway';
    const formData = generateFormData(paymentData);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentUrl;

    formData.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };
  return (
    coursePrice.length && (
      <ul className="flex flex-col gap-[25px]">
        {coursePrice.map(({ count, price }, index) => (
          <li
            key={index}
            onClick={() => getPaymentData({ count, price })}
            className="box-border flex w-[410px] cursor-pointer items-end justify-between rounded-[8px] bg-[#fff] bg-[rgba(188,227,250,0.2)] px-[16px] pb-[23px] pt-[36px] hover:bg-[rgba(188,227,250,0.5)]"
          >
            <p className="body text-[#525252]">
              {count} 堂 {count * 60} 分鐘
            </p>
            <p className="heading1 text-primary-500">
              <span className="heading5">NT$</span>
              {price}
            </p>
          </li>
        ))}
      </ul>
    )
  );
};

export default CoursePrice;
