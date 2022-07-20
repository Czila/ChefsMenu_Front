import React, { useState } from 'react';
import './AjouterunElement.css'
import logo from '../../assets/logo.png'


function AjouterunElement() {
    const [nom, setNom] = useState("")
    const [prix_HT, setPrixHT] = useState("")
    const [tva, setTVA] = useState("")
    const [description, setDescription] = useState("")  
    const [erreur,setErreur]= useState(false)

function VerifieElement(){
    if (nom!=="" && prix_HT!=="" && tva!==""){
        setElement()
    }
    else {setErreur(true)
    console.log(erreur)}
}

async function setElement (){

 console.log (nom, prix_HT, tva, description)
const url = 'http://localhost:3001/element'
const res = await fetch(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({nom, prix_HT, tva, description})
})

console.log(res)


}

    return (
        <div id='AjouterunElementForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='AUEFdiv'>
                <div className='AUEIdiv'>
                    
                  <label><b>Ajoutez votre élément</b></label>
                  <label><b>Nom</b></label>
                  <input type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                  <label><b>Prix H.T.</b></label>
                  <input type="number" placeholder="prix" name="prix HT" onChange={(e) => setPrixHT(e.currentTarget.value)} value={prix_HT} required/>
                  <label><b>TVA</b></label>
                  <input type="number" placeholder="tva" name="tva" onChange={(e) => setTVA(e.currentTarget.value)} value={tva} required/>
                  <label><b>Description</b></label>
                  <input type="textarea" placeholder="description" name="description" onChange={(e) => setDescription(e.currentTarget.value)} value={description}/>
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
