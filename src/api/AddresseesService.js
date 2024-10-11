import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListAddresseesApi(token) {
  
    return axiosInstance.get(`${baseURL}/addressees/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
