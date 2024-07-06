export interface CoursePriceProps {
  coursePrice: { _id: string; count: number; price: number }[];
  courseId: string;
  name: string;
}
export interface PurchasePostData {
  courseId: string;
  name: string;
  price: number;
  amount: number;
}
export interface PaymentData {
  merchantId: string;
  tradeInfo: string;
  tradeSha: string;
  version: string;
}
