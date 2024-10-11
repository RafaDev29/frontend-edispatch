import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListDriversApi(token) {
  
    return axiosInstance.get(`${baseURL}/drivers/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function updateDriverApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/drivers/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}



export function deleteDriversApi(token, id) {

    return axiosInstance.delete(`${baseURL}/drivers/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export function CreateDriversApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/drivers/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}