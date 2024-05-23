import React from "react";
const Apropos = ()=>{
    return(
        <div>
            <div className="container">
            <h1 className="text-center">Les univetsités publiques malagasy</h1>
            <h3>Madagascar a 6 universités publiques</h3>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Nom de l'université </th>
                    <th> Lien </th>
                    
                </thead>
                <tbody>
                <tr>
                <td>Université d'Antananarivo</td>
                <td>...</td>
                </tr>
                <tr>
                <td>Université de Toamasina</td>
                <td>...</td>
                </tr>
                <tr>
                <td>Université de Fianarantsoa</td>
                <td>...</td>
                </tr>
                <tr>
                <td>Université de Mahajanga</td>
                <td>...</td>
                </tr>
                <tr>
                <td>Université de Toliara</td>
                <td>...</td>
                </tr>
                <tr>
                <td>Université d'Antsiranana</td>
                <td>...</td>
                </tr>
                </tbody>

            </table>
            </div>
        </div>
    )
}
export default Apropos