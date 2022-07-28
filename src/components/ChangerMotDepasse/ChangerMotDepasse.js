import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { fetchWrapper } from '../../lib/useGestDB';


function ChangerMotDePasse() {
    const params = useParams()
    const token =params.token
    const [Restaurateur,setRestaurateur] = useState({})
    const url = 'http://localhost:3001/restaurateur/resetpassjwt'
    const [erreur,setErreur]=useState(false)
    const [info,setInfo]=useState(false)

    useEffect(() => {

        
        (async() => {
            try{
            const restaurateur= await fetchWrapper.post(url, {token})
            }
            catch(err)
            {
                setErreur(true)
                setInfo("")
            }
        })()
    
    },[])

    const updateForm = () => {
        console.log()
    }

    return (
        <div>
            <div className="changerMotDePasse">
                <h2>Merci de saissir votre mot de passe</h2>
                <label htmlFor="mdp1">Nouveau mot de passe : </label>
                <input type="password" id="mdp1" name="mdp1" />
                <label htmlFor="mdp2">Confirmation : </label>
                <input type="password" id="mdp2" name="mdp1" />                
                <button onClick={updateForm}>Enregistrer</button>
            </div>
            <div>
                <span>{info}</span>
            </div>
        </div> 
     );
}

export default ChangerMotDePasse;