import axios from "axios";

const FILIERE_BASE_REST_API_URl = "http://localhost:8080/api/v1/filiere";
const token = sessionStorage.getItem("token");
class FiliereService{
    getAllFiliere(){
        return axios.get(FILIERE_BASE_REST_API_URl,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    createFiliere(universite){
        return axios.post(FILIERE_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getFiliereById(universiteId){
        return axios.get(FILIERE_BASE_REST_API_URl+'/'+universiteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    deleteFiliere(universiteId){
        return axios.delete(FILIERE_BASE_REST_API_URl+'/'+universiteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new FiliereService();