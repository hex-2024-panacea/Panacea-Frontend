import OrderTable from '@/components/AdminTable/OrderTable';
import { getOrderList } from '@/app/api/admin/order';

export default async function orderPage() {
  const data = await getOrderList();
  return <OrderTable resultData={data.data} />;
}
