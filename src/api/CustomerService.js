
import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function ListCustomersApi(token) {
  
    return axiosInstance.get(`${baseURL}/customers/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function CreateCustomersApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/customers/add` , payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateCustomerApi(token, payload, id){

    return axiosInstance.put(`${baseURL}/customers/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}



export function deleteCustomerApi(token, id) {

    return axiosInstance.delete(`${baseURL}/customers/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

