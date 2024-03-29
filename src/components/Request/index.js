import axios from "axios"
import { STATIC_HOST } from "../const/common"

const axiosInstance = axios.create({
  baseURL: `${STATIC_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
})
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers["Authorization"] = token
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error.response.data)
  },
)

export default axiosInstance;

































// import axios from 'axios';

// const accessToken = localStorage.getItem("access_token")
// // Tạo instance của Axios với cấu hình mặc định
// export const axiosInstance = axios.create({
//   baseURL: 'https://book-store-bqe8.onrender.com',
//   headers: {
// 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// });


// // login

// const login = async () => {
//   try {
//     const response = await axios.post("", { username: "", password: "" })
//     const responseData = response.data;
//     if (responseData.success) {
//       localStorage.setItem("access_token", responseData.data.token)
//     }
//     return response.data
//   } catch (err) {
//     console.error(err);
//   }
// }


// const authToken = async () => {
//   try {
//     const getToken = localStorage.getItem("access_token");
//     const response = await axios.get("", {
//       headers: {
//         Authorization: getToken
//       }
//     })
//     const responseData = response.data;
//     if (responseData.success) {
//       localStorage.setItem("access_token", responseData.data.token)
//     }
//     return response.data
//   } catch (err) {
//     console.error(err);
//   }
// }


// // Sử dụng axiosInstance để gửi yêu cầu
// axiosInstance.get('/endpoint')
//   .then(response => {
//     // Xử lý phản hồi
//   })
//   .catch(error => {
//     // Xử lý lỗi
//   });