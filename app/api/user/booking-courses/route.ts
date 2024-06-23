import { NextResponse, NextRequest } from 'next/server';
// import axios from 'axios';

// Define the structure of the request body
// interface CustomSearchParams extends URLSearchParams {
//   status: string | null;
// }

const response = {
  data: [
    {
      id: '001',
      course: {
        name: '課程名稱',
        coverImage: 'https://picsum.photos/500/400?random=1',
      },
      courseSchedule: {
        startTime: '2024-10-10 00:00:00',
        endTime: '2024-10-10 01:00:00',
      },
      coach: {
        name: '教練名稱',
      },
    },
    {
      id: '002',
      course: {
        name: '課程名稱2',
        coverImage: 'https://picsum.photos/500/400?random=2',
      },
      courseSchedule: {
        startTime: '2024-10-10 00:00:00',
        endTime: '2024-10-10 01:00:00',
      },
      coach: {
        name: '教練名稱2',
      },
    },
  ],
};

export const GET = async (req: NextRequest) => {
  console.log('🚀 ~ GET ~ req:', req);
  // const searchParams: CustomSearchParams = req.nextUrl.searchParams as CustomSearchParams;
  // const status = searchParams.get('status');
  // console.log('🚀 ~ GET ~ status:', status);
  return NextResponse.json(response);
  // axios
  //   .get(`/api/user/order-list?status=${status}`)
  //   .then((response) => {
  //     return NextResponse.json(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });

  // try {
  //   // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/order/list?status=${status}`;
  //   // const response = await fetch(url);
  //   // // Parse the response data
  //   // const data = await response.json();
  //   return NextResponse.json(response);
  // } catch (error) {
  //   // Log the error for debugging
  //   console.error('Error during login:', error);

  //   // Return a 500 status code for internal server errors
  //   return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  // }
};
