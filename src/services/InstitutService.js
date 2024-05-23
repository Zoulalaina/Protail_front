import axios from "axios";

const INSTITUT_BASE_REST_API_URl = "http://localhost:8080/api/v1/institus";
const token = sessionStorage.getItem("token");
class InstitutService{
    getAllInstitut(){
        return axios.get(INSTITUT_BASE_REST_API_URl,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(INSTITUT_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getInstitutById(InstitutId){
        return axios.get(INSTITUT_BASE_REST_API_URl+'/'+InstitutId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    deleteInstitut(InstitutId){
        return axios.delete(INSTITUT_BASE_REST_API_URl+'/'+InstitutId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new InstitutService();