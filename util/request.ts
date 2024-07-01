let cookiesModule;

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
}

const fetchData = async ({ url, method, params }: FetchOptions) => {
  let token = '';

  if (typeof window === 'undefined') {
    // 在伺服器端
    token = cookiesModule().get('token').value;
  } else {
    // 在客戶端
    token = cookiesModule.get('token');
  }

  try {
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;

    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      apiUrl += `?${queryParams}`;
    }

    const response = await fetch(`${apiUrl}`, {
      method, // 或其他 HTTP 方法
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export default fetchData;
