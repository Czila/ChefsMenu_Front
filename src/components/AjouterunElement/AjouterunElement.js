import React, { useState,useEffect } from 'react';
import './AjouterunElement.css'
import logo from '../../assets/logo.png'
import { fetchWrapper } from '../../lib/useGestDB';

function AjouterunElement() {
    const [nom, setNom] = useState("")
    const [prix_HT, setPrixHT] = useState("")
    const [tva, setTVA] = useState(5.5)
    const [description, setDescription] = useState("")  
    const [erreur,setErreur]= useState(false)
    const [categorie,setCategorie]=useState("")
    const [categories,setCategories]=useState([{}])
    const idRestaurateur='62d96bb9d4455394b2a619c7'

function VerifieElement(){
    if (nom!=="" && prix_HT!=="" && tva!=="" && categorie!=="" ){
        setElement()
    }
    else {setErreur(true)
    console.log(erreur)}
}

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
    const update=await fetchWrapper.post('http://localhost:3001/element',
    {"nom":nom, "prix_HT":prix_HT, "tva":tva, "description":description,"categorie":categorie,"idRestaurant":idRestaurateur})

    //réinitialisation des variables
    setNom("")
    setPrixHT(0)
    setTVA(5.5)
    setDescription("")  
    setErreur(false)
    setCategorie("")
}

    return (
        <div id='AjouterunElementForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='AUEFdiv'>
                <div className='AUEIdiv'>
                    
                  <label className='AUEtitre'><b>Ajoutez votre élément</b><br/></label>
                  <label><b>Nom</b></label>
                  <input type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                  <label><b>Prix H.T.</b></label>
                  <input type="number" placeholder="prix" name="prix HT" onChange={(e) => setPrixHT(e.currentTarget.value)} value={prix_HT} required/>
                  <label><b>TVA</b></label>
                  <input type="number" placeholder="tva" name="tva" onChange={(e) => setTVA(e.currentTarget.value)} value={tva} required/>
                  <label><b>Description</b></label>
                  <input type="textarea" placeholder="description" name="description" onChange={(e) => setDescription(e.currentTarget.value)} value={description}/>
                  <label><b>Catégorie</b></label>
                  <select  value={categorie}  onChange={handleChange}>
                        <option>---</option>
                        {categories.map((cat) => 
                            <option value={cat.nom} key={cat._id}>{cat.nom} </option>
                        )}
                     </select>
                  </div>
                <div className='AUEBdiv'>
                  <input type="submit" id='submit' onClick={VerifieElement} />
                </div>
                {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
            </div>

        </div>

        );
}

export default AjouterunElement;
