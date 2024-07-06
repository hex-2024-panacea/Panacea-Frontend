'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Descriptions, Result } from 'antd';

const OrderSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (searchParams) {
      const params = [
        'title',
        'message',
        'status',
        'orderId',
        'paymentType',
        'payerAccount5Code',
        'payBankCode',
        'payTime',
        'totalPrice',
        'tradeNo',
      ];

      // Get the query parameters from the URL
      const queryParams = params.reduce(
        (acc, param) => {
          acc[param] = searchParams.get(param);
          return acc;
        },
        {} as Record<string, string | null>,
      );

      setOrderDetails(queryParams);
    }
  }, [searchParams]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-12 flex justify-center px-9 py-10">
      <div className="max-w-[1000px]">
        <Result
          status={orderDetails.status === 'success' ? 'success' : 'error'}
          title={orderDetails.title}
          subTitle={orderDetails.message}
        />
        <Card style={{ marginTop: 24 }}>
          <Descriptions title="Order Details" bordered>
            <Descriptions.Item label="Order ID">{orderDetails.orderId}</Descriptions.Item>
            <Descriptions.Item label="Payment Type">{orderDetails.paymentType}</Descriptions.Item>
            <Descriptions.Item label="Payer Account (Last 5 Digits)">
              {orderDetails.payerAccount5Code}
            </Descriptions.Item>
            <Descriptions.Item label="Pay Bank Code">{orderDetails.payBankCode}</Descriptions.Item>
            <Descriptions.Item label="Pay Time">{orderDetails.payTime}</Descriptions.Item>
            <Descriptions.Item label="Total Price">{orderDetails.totalPrice}</Descriptions.Item>
            <Descriptions.Item label="Trade No">{orderDetails.tradeNo}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
