import UserTable from '@/components/AdminTable/UserTable';
import { getUserList } from '@/app/api/admin/user';

export default async function userPage() {
  const data = await getUserList();
  return <UserTable resultData={data.data} />;
}
