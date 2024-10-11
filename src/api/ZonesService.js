import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListZonesApi(token) {
  
    return axiosInstance.get(`${baseURL}/zones/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function CreateZonesApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/zones/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function updateZonesApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/zones/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}


export function deleteZonesApi(token, id) {

    return axiosInstance.delete(`${baseURL}/zones/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

