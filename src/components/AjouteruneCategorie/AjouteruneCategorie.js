import React, { useState } from 'react';
import './AjouteruneCategorie.css'
import logo from '../../assets/logo.png'
import { fetchWrapper } from '../../lib/useGestDB';

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
}
catch(err)
{
    setFieldValidationErrors({message : err, error:true})
}
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
                  <input type="submit" id='submit' onClick={setCategorie} />

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
