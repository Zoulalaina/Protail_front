import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register () {
    const [userName, setUserName]=useState("");
    const [email, setEmail]=useState("");
    const [pass, setPass]=useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    async function save(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/v1/users/inscription", {
                userName: userName,
                email: email,
                pass: pass,
            });
            navigate("/login")
            
        } catch(err){
            alert("erreur");
        }
    }

    





    return(
        <div>
            <div className="container mt-4">
                <div className="card">
                    <h1 className="text-center">Registration</h1>

                    <form>
                        <div className="form group">
                            <label>Nom d'utilisateur :</label>
                            <input type="text" className="form-control" id="username" placeholder="Entrez votre nom d'utilisateur"
                            value={userName} onChange={(e)=>{setUserName(e.target.value);}} />


                        </div>
                        <div className="form group">
                            <label>Email :</label>
                            <input type="email" className="form-control" id="email" placeholder="Entrez votre email"
                            value={email} onChange={(e)=>{setEmail(e.target.value);}} />

                        </div>
                        <div className="form group">
                            <label>Password :</label>
                            <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe"
                            value={pass} onChange={(e)=>{setPass(e.target.value);}} />

                        </div>
                        <button type="submit" className="btn btn-primary mt-4" onClick={save}>Enregistrer</button>
                    </form>

                </div>

            </div>

            
        </div>
    )
    
 }
 export default Register 