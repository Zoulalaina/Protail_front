import axios from "axios";

const UNIV_BASE_REST_API_URl = "http://localhost:8080/api/v1/university";
const token = sessionStorage.getItem("token");

class UnivService{
    getAllUniv(){
        console.log(token);
        return axios.get(UNIV_BASE_REST_API_URl+"/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
        
    }
    getAllUniv2(){
      console.log(token);
      return axios.get(UNIV_BASE_REST_API_URl)
      
  }
    createUniv(universite){
        return axios.post(UNIV_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getUnivById(universiteId){
        return axios.get(UNIV_BASE_REST_API_URl+'/'+universiteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            } });
    }
    getUnivById2(universiteId){
      return axios.get(UNIV_BASE_REST_API_URl+'/'+universiteId);
  }
    deleteUniv(universiteId){
        return axios.delete(UNIV_BASE_REST_API_URl+'/'+universiteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new UnivService();