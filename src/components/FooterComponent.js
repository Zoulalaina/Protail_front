import React from "react";
import { FaFacebook,FaGithub,FaMapMarkerAlt, FaLinkedin, FaPhone, FaEnvelope, FaCopyright} from "react-icons/fa";
 const FooterComponent = () =>{
    return(
        <div>
            <footer className="footer">
            <div> 
            
                <FaMapMarkerAlt/><a>        Tsimbazaza</a><br/>
                <FaPhone/><a>    +261 34 39 699 87</a><br/>
                
            </div>
            <div> 
            
            <FaCopyright/>
            <a> 2024</a>
            <a> Mesupres</a>
            
        </div>
        <div> 
        <a>Connectez-vous :</a><br/>
            <FaFacebook/>
            <FaGithub/>
            <FaLinkedin/>
            <FaEnvelope/>
        </div>


            </footer>
        </div>
    )
    
 }
 export default FooterComponent