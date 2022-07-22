import React, { useEffect, useState } from 'react';
import './NouvelleCarte.css'
import logo from '../../assets/logo.png'


function NouvelleCarte() {
    const [menus, setMenus] = useState("")
    const [plats, setPlats] = useState("")  
    const [erreur,setErreur]= useState(false)
function VerifieCarte(){
    if (menus!=="" && plats!==""){
        setCarte()
    }
    else {setErreur(true)
    console.log(erreur)}
}
async function getElements (){
    const url = 'http://localhost:3001/element'
    const resb = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return resb
}

async function getMenus (){
    const url = 'http://localhost:3001/element'
    const resc = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
return resc}


async function setCarte (){

 console.log (menus, plats)
const url = 'http://localhost:3001/carte'
const res = await fetch(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({menus, plats})
})

console.log(res)
function reloadComponent(){
    window.location.reload(false);
  }
  reloadComponent()

}

    return (
        <div id='NouvelleCarteForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='NCFdiv'>
                <div className='NCIdiv'>
                    
                <label className='NCtitre'><b>Ajoutez un plat ou un menu à votre carte</b><br/></label>
                <select onChange={(e) => setPlats(e.currentTarget.value)} value={plats}>
    		            <option value="plats">plats</option>
                        
   		        </select>
                   <select onChange={(e) => setMenus(e.currentTarget.value)} value={menus}>
                   <option value="menus">menus</option>
                        
   		        </select>
                   
                </div>
                <div className='AUEBdiv'>
                  <input type="submit" id='submit' onClick={VerifieCarte} />

                </div>
                {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
            </div>

        </div>

        );
}

export default NouvelleCarte;
