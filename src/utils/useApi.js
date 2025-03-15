import { useCallback } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const baseUrl = "http://localhost:5000";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
let token = "6567|TKVq1GCLSOJcgjAdH6KPHXi9bGwq8lagLrsK8o4Sfc93e8da";

const useApi = () => {
  //   const navigate = useNavigate();
  /**
   * Function to make an API request.
   * @param {string} url - The API endpoint.
   * @param {object} options - Axios request options (method, headers, data, etc.).
   * @param {function} callBack
   * @returns {Promise<{ data: any, error: any }>}
   */
  const fetchData = useCallback(async (url, options = {}, callBack) => {
    let response = null;
    let error = null;

    try {
      const res = await axios({
        url: baseUrl + url,
        ...options,
        // withCredentials: true,
        headers: {
          ...options?.headers,
          Authorization: "Bearer " + token,
        },
      });
      response = res.data;
      if (response?.message === "logouted") {
        // navigate("/login/signin");
      }
      callBack(response, true);
      //   toast.success(response.message);
    } catch (err) {
      if (err.response?.data.message === "otp_not_verified") {
        // navigate(`/login/otp?email=${err.response?.data.data?.email}`);
      }
      callBack(err.response, false);
      if (err.response?.data.message === "unauthenticated") {
        // navigate("/login/signin");
      } else if (err.response?.data.message) {
        // toast.error(err.response?.data.message);
      }
    }

    return { response, error };
  }, []);

  return { fetchData };
};

export default useApi;
