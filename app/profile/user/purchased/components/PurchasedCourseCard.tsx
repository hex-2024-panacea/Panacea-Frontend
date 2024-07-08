'use client';
import { useEffect, useState } from 'react';
import { Button, Skeleton, Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import axios from 'axios';
import type { Course, PurchasedPageProps } from '@/types/user';
const { Meta } = Card;

const CourseCard = ({ status }: PurchasedPageProps) => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchCourses(status);
  }, [status]);

  const fetchCourses = async (status: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/purchased-courses?status=${status}`);
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const linkToCrouse = (crouseId: string, orderId: string) => {
    router.push(`purchased/${crouseId}?orderId=${orderId}`);
  };
  if (loading) {
    return <Skeleton active />;
  }
  return (
    <div className="max-w-[650px]">
      {courses.length ? (
        courses.map((course) => (
          <Card className="w-full cursor-pointer hover:shadow-md" key={course._id} style={{ marginTop: 16 }}>
            <Skeleton loading={loading} paragraph={{ rows: 4 }} active>
              <Meta
                description={
                  <>
                    <div className="flex justify-between border-b border-primary-200 pb-5">
                      <ul className="flex max-h-[3.5em] flex-col flex-wrap gap-x-6">
                        <li>
                          訂單成立 <span>{dayjs(course.createdAt).format('YYYY/MM/DD HH:mm')}</span>
                        </li>
                        <li>
                          付款時間 <span>{course.payTime}</span>
                        </li>
                        <li>
                          付款方式 <span>{course.paymentType}</span>
                        </li>
                        <li>
                          付款金額 <span>{course.totalPrice}</span>
                        </li>
                      </ul>
                      <div>{course.status}</div>
                    </div>
                    <div className="flex justify-between border-b border-primary-200 py-5">
                      <div className="flex items-center gap-4">
                        <div className="max-w-36">
                          <Image
                            src={course.course?.coverImage}
                            className="rounded-md"
                            alt="course picture"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div>
                          <ul>
                            <li className="text-lg text-primary-500">{course.name}</li>
                            <li>教練： {course.course?.coach.name}</li>
                            <li>內容： {course.course?.description}</li>
                          </ul>
                        </div>
                      </div>
                      <div>NT${course.price}</div>
                    </div>
                    <div className="flex justify-between pt-5">
                      <ul className="flex max-h-[3.5em] flex-col flex-wrap gap-x-6">
                        <li>購買堂數: {course.purchaseCount}</li>
                        <li>已預約堂數: {course.bookingCount}</li>
                        <li>剩餘堂數: {course.remainingCount}</li>
                      </ul>
                      <div>
                        <Button onClick={() => linkToCrouse(course.courseId, course._id)} type="primary">
                          預約課程
                        </Button>
                      </div>
                    </div>
                  </>
                }
              />
            </Skeleton>
          </Card>
        ))
      ) : (
        <div>尚未有課程資料</div>
      )}
    </div>
  );
};

export default CourseCard;
