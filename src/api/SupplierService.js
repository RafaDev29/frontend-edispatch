import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListSuppliersApi(token) {
  
    return axiosInstance.get(`${baseURL}/suppliers/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function CreateSuppliersApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/suppliers/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function updateSuppliersApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/suppliers/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}


export function deleteSuppliersApi(token, id) {

    return axiosInstance.delete(`${baseURL}/suppliers/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

