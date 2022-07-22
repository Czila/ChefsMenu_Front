import React, { useEffect, useState } from 'react';
import './AjouteruneCategorie.css'
import logo from '../../assets/logo.png'


function AjouteruneCategorie() {
    const [nom, setNom] = useState("")
    const [erreur,setErreur]= useState(false)

function VerifieCategorie(){
    if (nom!==""){
        setCategorie()
    }
    else {setErreur(true)
    console.log(erreur)}
}

async function setCategorie (){

 console.log (nom)
const url = 'http://localhost:3001/categorie'
const res = await fetch(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({nom})
})

console.log(res)
function reloadComponent(){
    window.location.reload(false);
  }
  reloadComponent()

}

    return (
        <div id='AjouteruneCategorieForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='AUCdiv'>
                <div className='AUCdiv'>
                    
                  <label className='AUCtitre'><b>Ajoutez une catégorie (entrées, plats, desserts, boissons...)</b><br/></label>
                  <label><b>Nom</b></label>
                  <input type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                </div>
                <div className='AUCdiv'>
                  <input type="submit" id='submit' onClick={VerifieCategorie} />

                </div>
                {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
            </div>

        </div>

        );
}

export default AjouteruneCategorie;
