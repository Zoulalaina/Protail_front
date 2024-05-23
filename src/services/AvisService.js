import axios from "axios";

const AVIS_BASE_REST_API_URl = "http://localhost:8080/api/v1/avis";
const token = sessionStorage.getItem("token");
class AvisService{
    getAllAvis(){
        return axios.get(AVIS_BASE_REST_API_URl)
    }
    create(universite){
        return axios.post(AVIS_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getAvisById(AvisId){
        return axios.get(AVIS_BASE_REST_API_URl+'/'+AvisId);
    }
    deleteAvis(AvisId){
        return axios.delete(AVIS_BASE_REST_API_URl+'/'+AvisId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new AvisService();