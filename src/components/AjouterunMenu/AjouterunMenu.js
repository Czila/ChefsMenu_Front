import React, { useEffect, useState } from 'react';
import './AjouterunMenu.css'
import logo from '../../assets/logo.png'


function AjouterunMenu() {
    const [nom, setNom] = useState("")
    const [prix_HT, setPrixHT] = useState("")
    const [tva, setTVA] = useState("")
    const [erreur,setErreur]= useState(false)

function VerifieMenu(){
    if (nom!=="" && prix_HT!=="" && tva!=="" && plats!==[null]){
        setMenu()
    }
    else {setErreur(true)
    console.log(erreur)}
}

async function setMenu (){

 console.log (nom)
const url = 'http://localhost:3001/menu'
const res = await fetch(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({nom, prix_HT, plats})
})

console.log(res)
function reloadComponent(){
    window.location.reload(false);
  }
  reloadComponent()

}

    return (
        <div id='AjouterunMenuForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='AUMdiv'>
                <div className='AUMdiv'>
                    
                  <label className='AUMtitre'><b>Créez vos menus personnalisés</b><br/></label>
                  <label><b>Donnez un nom à votre menu</b></label>
                  <input type="text" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                  <label><b>Prix H.T.</b></label>
                  <input type="number" placeholder="prix" name="prix HT" onChange={(e) => setPrixHT(e.currentTarget.value)} value={prix_HT} required/>
                  <label><b>TVA</b></label>
                  <input type="number" placeholder="tva" name="tva" onChange={(e) => setTVA(e.currentTarget.value)} value={tva} required/>
                  <select onChange={(e) => handleChange(e)}>
    		            <option value="plats">plats</option>
   		        </select>
                </div>
                <div className='AUMdiv'>
                  <input type="submit" id='submit' onClick={VerifieMenu} />

                </div>
                {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
            </div>

        </div>

        );
}

export default AjouterunMenu;
