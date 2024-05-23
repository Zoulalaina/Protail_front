import axios from "axios";

const PARCOURS_BASE_REST_API_URl = "http://localhost:8080/api/v1/parcours";
const token = sessionStorage.getItem("token");

class ParcoursService{
    getAllParcours(){
        return axios.get(PARCOURS_BASE_REST_API_URl+"/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(PARCOURS_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getParcoursById(parcoursId){
        return axios.get(PARCOURS_BASE_REST_API_URl+'/id/'+parcoursId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});

    }
    getParcoursById_id(parcoursId){
      return axios.get(PARCOURS_BASE_REST_API_URl+'/id/'+parcoursId);

  }
    getParcoursById2(parcoursId){
      return axios.get(PARCOURS_BASE_REST_API_URl+'/'+parcoursId);

  }
    getParcoursByMetion(parcoursId){
        return axios.get(PARCOURS_BASE_REST_API_URl+'/'+parcoursId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    deleteParcours(parcoursId){
        return axios.delete(PARCOURS_BASE_REST_API_URl+'/'+parcoursId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new ParcoursService();