import { FetchOptions } from '@/types/request';
import { redirect } from 'next/navigation';

async function getCookieModule() {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    return cookies;
  } else {
    const cookieModule = await import('js-cookie');
    return cookieModule.default;
  }
}

const fetchData = async ({ url, method, params, data }: FetchOptions) => {
  const cookiesModule: any = await getCookieModule();
  let token = '';

  // 取得 token
  if (typeof window === 'undefined') {
    // 在伺服器端
    token = cookiesModule().get('token')?.value;
    if (!token) {
      redirect('/login');
    }
  } else {
    // 在客戶端
    token = cookiesModule.get('token');
  }

  try {
    // 初始化 options
    const requestOptions: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;

    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      apiUrl += `?${queryParams}`;
    }

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    // 發送請求
    const response = await fetch(`${apiUrl}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 回傳資料
    return await response.json();
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export default fetchData;
