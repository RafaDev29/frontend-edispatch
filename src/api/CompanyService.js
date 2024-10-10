import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function createCompanyApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/companies/add`,payload ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function listCompanyApi(token) {

    return axiosInstance.get(`${baseURL}/companies/all`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateCompanyApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/companies/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}

export function deleteCompanyApi(token, id) {

    return axiosInstance.delete(`${baseURL}/companies/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



