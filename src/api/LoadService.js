import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListLoadApi(token) {
  
    return axiosInstance.get(`${baseURL}/loads/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function CreateLoadsApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/loads/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function updateLoadsgApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/loads/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}


export function deleteLoadApi(token, id) {

    return axiosInstance.delete(`${baseURL}/loads/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

