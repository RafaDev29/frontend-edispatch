
import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function ListSettingApi(token) {
  
    return axiosInstance.get(`${baseURL}/configurations/find` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}