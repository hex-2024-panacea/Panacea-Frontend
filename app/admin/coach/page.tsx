import CoachTable from '@/components/AdminTable/CoachTable';
import { getCoachList } from '@/app/api/admin/coach';

export default async function coachPage() {
  const data = await getCoachList();
  return <CoachTable resultData={data.data} />;
}
