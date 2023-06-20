import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import baseAxiosMethod from "./baseAxiosMethod";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    const combinedUrl = `${baseUrl}${url}`;

    try {
      const axiosCall = () => {
        switch (method) {
          case "get":
            return baseAxiosMethod.get(combinedUrl, data);

          case "post":
            return baseAxiosMethod.post(combinedUrl, data);

          case "patch":
            return baseAxiosMethod.patch(combinedUrl, data);

          case "put":
            return baseAxiosMethod.put(combinedUrl, data);

          case "delete":
            return baseAxiosMethod.delete(combinedUrl, data);

          default:
            return baseAxiosMethod.get(combinedUrl, data);
        }
      };

      const response = await axiosCall();

      return { data: response?.data || response };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
