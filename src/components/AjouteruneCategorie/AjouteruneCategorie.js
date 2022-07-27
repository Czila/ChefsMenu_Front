import React, { useState } from 'react';
import './AjouteruneCategorie.css'
import { fetchWrapper } from '../../lib/useGestDB';
import menu from '../../assets/menu.png'

function AjouteruneCategorie() {
    const [nom, setNom] = useState("")
    const [fieldValidationErrors,setFieldValidationErrors] = useState({
        message:'',
        error:false})

async function setCategorie (){
const url = `http://localhost:3001/categorie`
try {
    await fetchWrapper.post(url,{nom})
    setNom("")
    setFieldValidationErrors({message : "", error:false})
}
catch(err)
{
    setFieldValidationErrors({message : err, error:true})
}
}

    return (
        <div id='AjouteruneCategorieForm'>
            <div>
              <img src={menu} alt="Logo" className='logo' />
            </div>
            <div className='AUCdiv'>
                <div className='AUCdiv'>
                    
                  <label className='AUCtitre'><h3><b>Ajoutez une catégorie (entrées, plats, desserts, boissons...) </b></h3></label><br/><br/>
                  <label><b>Nom</b></label><br/>
                  <input className='input' type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                </div><br/>
                <div className='AUCdiv'>
                  <button className='buttonstyle' onClick={setCategorie}>Enregistrer</button>

                </div>
                {(fieldValidationErrors.error) && 
                <div >
                    <label className='error'>{fieldValidationErrors.message}</label>
                </div>}
            </div>

        </div>

        );
}

export default AjouteruneCategorie;
