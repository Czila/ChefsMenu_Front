import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { fetchWrapper } from '../../lib/useGestDB';
import './ChangerMotDepasse.css'

function ChangerMotDePasse() {
    const params = useParams()
    const token =params.token
    const [restaurateur,setRestaurateur] = useState({})
    const [mdp,setMdp]=useState({mdp1:'',mdp2:''})
    const url = 'http://localhost:3001/restaurateur/resetpassjwt'

    const [info,setInfo]=useState({active:false,message:''})

    useEffect(() => {
        (async() => {
            try{
            setRestaurateur(await fetchWrapper.post(url, {token}))
            }
            catch(err)
            {
                setInfo({active:true,message:err})
            }
        })()
    
    },[])

    const  updateForm = async () => {
        let i =""
        
        if((mdp.mdp1.length<=8)||(mdp.mdp2.length<=8)) 
        i="mot de passe trop petit"
        if((mdp.mdp1)!==(mdp.mdp2)) 
        i="Les deux mot de passe sont différents "

        setInfo({message:i})
        if(info.message.length===0) 
        {
            try {
                await fetchWrapper.post('http://localhost:3001/restaurateur/updatePassword/'+restaurateur , {mdp})
                setInfo({active:true,message:"mot de passe modifié"})
            }
            catch (err)
            {
                setInfo({message:err})
            }
        }

    }

    const handleChange = (e) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
  
        setMdp({...mdp, [name]:value})
      }

    return (
        <div>
            {(!info.active)
            ?
            <div className="changerMotDePasse">
                <h2>Merci de saisir votre mot de passe</h2>
                <label htmlFor="mdp1">Nouveau mot de passe : </label>
                <input type="password" id="mdp1" name="mdp1" value={mdp.mdp1} onChange={handleChange}/>
                <label htmlFor="mdp2">Confirmation : </label>
                <input type="password" id="mdp2" name="mdp2" value={mdp.mdp2} onChange={handleChange}/>                
                <button onClick={updateForm}>Enregistrer</button>
                {(info.message.length>0) && <span className='alert'>{info.message}</span>}
            </div>
            :
            <div>
                <span>{info.message}</span>
            </div>
            }
        </div> 
     );
}

export default ChangerMotDePasse;