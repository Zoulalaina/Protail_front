import axios from "axios";

const EMPLOYEE_BASE_REST_URL='http://localhost:8080/api/v1/user';
const EMPLOYEE_BASE_REST_URL2='http://localhost:8080/api/v1/user/logout';
const token = sessionStorage.getItem("token");
class EmployeeService{
    getStatus(){
        return axios.get(EMPLOYEE_BASE_REST_URL,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    logout(){
        return axios.get(EMPLOYEE_BASE_REST_URL2,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
    }
    
}

export default new EmployeeService();