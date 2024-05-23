import axios from "axios";

const MENTION_BASE_REST_API_URl = "http://localhost:8080/api/v1/mention";
const token = sessionStorage.getItem("token");
class MentionService{
    getAllMention(){
        return axios.get(MENTION_BASE_REST_API_URl+"/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    create(universite){
        return axios.post(MENTION_BASE_REST_API_URl, universite,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    getMentionById(mentionId){
        return axios.get(MENTION_BASE_REST_API_URl+'/'+mentionId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    getMentionById2(mentionId){
      return axios.get(MENTION_BASE_REST_API_URl+'/'+mentionId);
  }
    getMentionByEtab(mentionId){
        return axios.get(MENTION_BASE_REST_API_URl+'/id/'+mentionId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    getMentionByEtab2(mentionId){
      return axios.get(MENTION_BASE_REST_API_URl+'/id/'+mentionId);
        }
    deleteMention(mentionId){
        return axios.delete(MENTION_BASE_REST_API_URl+'/'+mentionId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    }
    
}
export default new MentionService();