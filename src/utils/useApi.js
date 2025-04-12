// import { useCallback } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // const baseUrl = "http://localhost:5000";
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const useApi = () => {
//   //   const navigate = useNavigate();
//   /**
//    * Function to make an API request.
//    * @param {string} url - The API endpoint.
//    * @param {object} options - Axios request options (method, headers, data, etc.).
//    * @param {function} callBack
//    * @returns {Promise<{ data: any, error: any }>}
//    */
//   const fetchData = useCallback(async (url, options = {}, callBack) => {
//     let response = null;
//     let error = null;
//     const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

//     // const requestBody = options.body instanceof FormData
//     //   ? Object.fromEntries(options.body.entries())
//     //   : options.body;
//     // console.log("API Request:", {
//     //   url: baseUrl + url,
//     //   method: options.method || "GET",
//     //   headers: {
//     //     ...options.headers,
//     //     ...({ Authorization: `Bearer ${token}` }),
//     //   },
//     //   body: requestBody,
//     // });

//     try {
//       const res = await axios({
//         url: baseUrl + url,
//         ...options,
//         // withCredentials: true,
//         headers: {
//           ...options?.headers,
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       response = res.data;
//       if (response?.message === "logouted") {
//         // navigate("/login/signin");
//       }
//       callBack(response, true);
//       //   toast.success(response.message);
//     } catch (err) {
//       if (err.response?.data.message === "otp_not_verified") {
//         // navigate(`/login/otp?email=${err.response?.data.data?.email}`);
//       }
//       callBack(err.response, false);
//       if (err.response?.data.message === "unauthenticated") {
//         // navigate("/login/signin");
//       } else if (err.response?.data.message) {
//         // toast.error(err.response?.data.message);
//       }
//     }

//     return { response, error };
//   }, []);

//   return { fetchData };
// };

// export default useApi;





// src/utils/useApi.js
import { useCallback } from "react";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const useApi = () => {
  const fetchData = useCallback(async (url, options = {}, callBack) => {
    let response = null;
    let error = null;
    const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

    // Determine if method requires a body
    const method = (options.method || "GET").toUpperCase();
    const hasBody = ["POST", "PUT", "PATCH"].includes(method);

    // Log request details
    const requestBody = hasBody && options.body instanceof FormData
      ? Object.fromEntries(options.body.entries())
      : hasBody
        ? options.body
        : null;
    console.log("API Request Preparing:", {
      url: baseUrl + url,
      method,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: requestBody,
    });

    try {
      const config = {
        url: baseUrl + url,
        method,
        headers: {
          ...(options.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Only include data for methods with a body
        ...(hasBody && options.body ? { data: options.body } : {}),
      };

      console.log("Axios Config:", config);

      const res = await axios(config);
      response = res.data;
      console.log("API Response:", response);
      callBack(response, true);
    } catch (err) {
      error = err.response?.data || { message: "Request failed" };
      console.error("API Error:", error);
      callBack(error, false);
    }

    return { response, error };
  }, []);

  return { fetchData };
};

export default useApi;