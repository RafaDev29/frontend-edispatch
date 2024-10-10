import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function ListCisternsApi(token) {
  
    return axiosInstance.get(`${baseURL}/cisterns/all` ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function createCisternsApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/cisterns/add` ,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function deleteCisternsApi(token, id) {

    return axiosInstance.delete(`${baseURL}/cisterns/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



  
export function updateCisternsApi(token, payload, id){
    console.log(id)
    return axiosInstance.put(`${baseURL}/cisterns/update/${id}`, payload,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
}


