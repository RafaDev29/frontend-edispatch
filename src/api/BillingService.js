import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListBillingApi(token) {
  
    return axiosInstance.get(`${baseURL}/billings/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function CreateBillingApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/billings/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function updateBillingApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/billings/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}


export function deleteBillingApi(token, id) {

    return axiosInstance.delete(`${baseURL}/billings/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

