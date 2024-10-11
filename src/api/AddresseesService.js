import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListAddresseesApi(token) {
  
    return axiosInstance.get(`${baseURL}/addressees/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function CreateAddresseesApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/addressees/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function updateAddresseesApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/addressees/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}



export function deleteAddresseesApi(token, id) {

    return axiosInstance.delete(`${baseURL}/addressees/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
