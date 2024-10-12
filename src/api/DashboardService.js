import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListDashboardApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/dispatches/report` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
