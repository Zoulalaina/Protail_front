import axios from "axios";

const ETABLISSEMENT_BASE_REST_API_URl = "http://localhost:8080/api/v1/etablissement";
const ETABLISSEMENT_BASE_REST_API_URl2 = "http://localhost:8080/api/v1/etablissement/id";
const token = sessionStorage.getItem("token");

class EtablissementService{
    getAllFaculte(){
        return axios.get(ETABLISSEMENT_BASE_REST_API_URl,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(ETABLISSEMENT_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getEtabByUniv(univId){
        return axios.get(ETABLISSEMENT_BASE_REST_API_URl+'/'+univId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    getEtabByUniv2(univId){
      return axios.get(ETABLISSEMENT_BASE_REST_API_URl+'/'+univId);
  }
    deleteEtab(faculteId){
        return axios.delete(ETABLISSEMENT_BASE_REST_API_URl+'/'+faculteId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    getById(idEtab){
        return axios.get(ETABLISSEMENT_BASE_REST_API_URl2+'/'+idEtab,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    getById2(idEtab){
      return axios.get(ETABLISSEMENT_BASE_REST_API_URl2+'/'+idEtab);
  }
    
}
export default new EtablissementService();