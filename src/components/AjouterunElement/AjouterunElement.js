import React, { useState,useEffect } from 'react';
import './AjouterunElement.css'
import menu from '../../assets/menu.png'
import { fetchWrapper } from '../../lib/useGestDB';

function AjouterunElement() {
    const [nom, setNom] = useState("")
    const [prix_HT, setPrixHT] = useState("")
    const [tva, setTVA] = useState(5.5)
    const [description, setDescription] = useState("")  
    const [categorie,setCategorie]=useState("")
    const [categories,setCategories]=useState([{}])
    const [fieldValidationErrors,setFieldValidationErrors] = useState({
        message:'',
        error:false})


function handleChange(e){
    setCategorie(e.target.value)
}

useEffect(()=>
{
    async function updateCategories() {
        setCategories(await fetchWrapper.get(`http://localhost:3001/categorie/`))
    }
    updateCategories()
},[])



async function setElement (){
    
    try {
        await fetchWrapper.post('http://localhost:3001/element',
        {"nom":nom, "prix_HT":prix_HT, "tva":tva, "description":description,"categorie":categorie})

        //réinitialisation des variables
        setNom("")
        setPrixHT(0)
        setTVA(5.5)
        setDescription("")  
        setCategorie("")
        setFieldValidationErrors({message : "", error:false})
    }
    catch(err)
    {
        setFieldValidationErrors({message : err, error:true})
    }
}

    return (
        <div id='AjouterunElementForm'>
            <div>
              <img src={menu} alt="Logo" className='logo' />
            </div>
            <div className='AUEFdiv'>
                <div className='AUEIdiv'>
                    
                  <label className='AUEtitre'><b>Ajoutez votre élément</b></label><br/><br/>
                  <label><b>Nom</b></label>
                  <input className='input' type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                  <label><b>Prix H.T.</b></label>
                  <input className='input' type="number" placeholder="prix" name="prix HT" onChange={(e) => setPrixHT(e.currentTarget.value)} value={prix_HT} required/>
                  <label><b>TVA</b></label>
                  <input className='input' type="number" placeholder="tva" name="tva" onChange={(e) => setTVA(e.currentTarget.value)} value={tva} required/>
                  <label><b>Description</b></label>
                  <input className='input' type="textarea" placeholder="description" name="description" onChange={(e) => setDescription(e.currentTarget.value)} value={description}/>
                  <label><b>Catégorie</b></label>
                  <select  className='input' value={categorie}  onChange={handleChange}>
                        <option>---</option>
                        {categories.map((cat) => 
                            <option value={cat.nom} key={cat._id}>{cat.nom} </option>
                        )}
                     </select><br/><br/>
                  </div>
                <div className='AUEBdiv'>
                  <button className='buttonstyle' onClick={setElement}>Ajouter</button>
                </div>
                {(fieldValidationErrors.error) && 
                <div >
                    <label className='error'>{fieldValidationErrors.message}</label>
                </div>}
            </div>

        </div>

        );
}

export default AjouterunElement;
