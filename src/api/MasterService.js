import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function createMasterApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/masters/add`,payload ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function listMasterApi(token) {
  console.log("este es el token ==================================>", token )
    return axiosInstance.get(`${baseURL}/masters/all`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateMasterApi(token, payload, id){
    return axiosInstance.put(`${baseURL}/masters/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}



