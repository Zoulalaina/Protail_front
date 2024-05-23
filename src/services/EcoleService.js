import axios from "axios";

const ECOLE_BASE_REST_API_URl = "http://localhost:8080/api/v1/ecole";
const token = sessionStorage.getItem("token");
class EcoleService{
    getAllEcole(){
        return axios.get(ECOLE_BASE_REST_API_URl,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(ECOLE_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getEcoleById(EcoleId){
        return axios.get(ECOLE_BASE_REST_API_URl+'/'+EcoleId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    deleteEcole(EcoleId){
        return axios.delete(ECOLE_BASE_REST_API_URl+'/'+EcoleId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new EcoleService();