let cookiesModule: any;

if (typeof window === 'undefined') {
  // 在伺服器端
  import('next/headers')
    .then(({ cookies }) => {
      cookiesModule = cookies;
    })
    .catch((error) => {
      console.error('Failed to import next/headers:', error);
    });
} else {
  // 在客戶端
  import('js-cookie')
    .then((module) => {
      cookiesModule = module.default;
    })
    .catch((error) => {
      console.error('Failed to import js-cookie:', error);
    });
}

interface FetchOptions {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

const fetchData = async ({ url, method, params, data }: FetchOptions) => {
  let token = '';

  // 取得 token
  if (typeof window === 'undefined') {
    // 在伺服器端
    token = cookiesModule().get('token').value;
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
