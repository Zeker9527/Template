import service from "./axios";
import { baseURL } from "./axios";

/**
 * Get 请求
 * @returns
 */
export function get<T>(url: string, params = {}, headers = {}): Promise<T> {
  return service({
    method: "GET",
    url: url,
    params: params ?? {},
    headers: headers
  });
}

/**
 * Post 请求
 * @returns
 */
export function post<T>(url: string, data = {}, headers = {}): Promise<T> {
  return service.post(url, data, headers);
}

/**
 * 请求流式接口
 * @returns
 */
export async function streamRequest(
  url: string,
  data = {},
  headers = {},
  signal?: AbortSignal
): Promise<ReadableStreamDefaultReader<any>> {
  try {
    let response = await fetch(baseURL + url, {
      method: "POST",
      signal,
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error();
    }

    return (response.body as ReadableStream).getReader();
  } catch (e) {
    throw e;
  }
}
