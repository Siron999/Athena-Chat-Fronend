import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const useAxiosWrapper = () => {
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Accept: "application/json" },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status && error.response.status === 401) {
        console.log(error.message);
        Cookie.remove("Authorization");
        router.push("/login");
      } else if (error.response.status === 403) {
        router.push("/verify");
      }
      throw error;
    }
  );

  return {
    axios: axiosInstance,
  };
};

export default useAxiosWrapper;
