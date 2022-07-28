import './AccueilLogin.css'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB';
import welcome from '../../assets/welcome.gif'


function AccueilLogin(){  
    const idRestaurateur=localStorage.getItem("userId");
    const [restaurateur,setRestaurateur]=useState({});
    
    const getNomRestaurateur = async () => {
        const NP = (await fetchWrapper.get(`http://localhost:3001/restaurateur/${idRestaurateur}`))
        setRestaurateur(NP)
    }
useEffect( () => {
    getNomRestaurateur()
})
    
    return(
        <div id="AccueilLogin">
            <div>
          <img src={welcome} alt="welcome" className='logo' /><br/><br/>
        </div>
            <div className='ALchoices'>
                <label className='ALbienvenue'><h3>Bienvenue {`${restaurateur[0].prenom}`} {`${restaurateur[0].nom}`}<br/>
                Sélectionnez votre restaurant </h3></label>
            </div>
        </div>
    
    
    
    )
    }
    
    export default AccueilLogin