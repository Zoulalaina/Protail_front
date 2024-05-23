import axios from "axios";

const FACULTE_BASE_REST_API_URl = "http://localhost:8080/api/v1/faculte";
const token = sessionStorage.getItem("token");
class FaculteService{
    getAllFaculte(){
        return axios.get(FACULTE_BASE_REST_API_URl,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(FACULTE_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getFaculteById(faculteId){
        return axios.get(FACULTE_BASE_REST_API_URl+'/'+faculteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    deleteFaculte(faculteId){
        return axios.delete(FACULTE_BASE_REST_API_URl+'/'+faculteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new FaculteService();