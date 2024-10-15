const BASE_URL = 'https://mate.academy/students-api';

interface RequestOptions extends RequestInit {
  body?: any;
}

const request = <T>(url: string, options: RequestOptions): Promise<T> => {
  return fetch(BASE_URL + url, options).then(res => {
    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    return res.json();
  });
};

export const client = {
  get: <T>(url: string) =>
    request<T>(url, {
      method: 'GET',
    }),
  post: <T>(
    url: string,
    data: any,
    params?: Omit<RequestInit, 'body' | 'method'>,
  ) =>
    request<T>(url, {
      ...params,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...params?.headers,
      },
    }),
  delete: <T>(url: string) =>
    request<T>(url, {
      method: 'DELETE',
    }),
  patch: <T>(url: string, data: any) =>
    request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
