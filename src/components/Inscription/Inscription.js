import React, { useState } from 'react';
import './Inscription.css'

function Inscription() {
    const baseUrl = `http://localhost:3001/restaurateur`;
    const [fieldValidationErrors,setFieldValidationErrors] = useState({
    message:'',
    mail:'',
    error:false})
    const [inscriptionFini,setInscriptionFini]= useState(false)

    const [newRestaurateur,setNewRestaurateur]=useState({
        nom:'',
        prenom:'',
        mail:'',
        motdepasse:''
    })

    const updateDB = async () => {
        try {
            const res = await fetch(`${baseUrl}`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
              body: JSON.stringify(newRestaurateur),
            });
            const data = await res.json();
            if (!res.ok) {
              const err = `${res.status}-${data.message}`
              throw new Error(err);
            }
            
            const result = {
              status: res.status + "-" + res.statusText,
              headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
              },
              data: data,
            };
            setInscriptionFini(true)
          } catch (err) {
            const errSplit = err.message.split('-')
            let mesErr=''
            if (errSplit[0] === '500') { mesErr = 'Un compte existe déja avec ce mail'}
            else { mesErr = errSplit[1]}
            setFieldValidationErrors({...fieldValidationErrors, message : mesErr, error:true}) 
          }
    }



    const saveRestaurateur = (e) => {

        updateDB() 
         e.preventDefault()
         // setFieldValidationErrors({...fieldValidationErrors, message :' Merci de saissir toutes vos informations', error:true})
    }
    const handleChange = (e) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setNewRestaurateur({...newRestaurateur, [name]:value})
      }

    return ( 
        <div id='inscriptionForm' className='formDiv'>
        {(inscriptionFini) ?
        <div>
          <h1>Inscription validé</h1>
          <span>Merci pour vogtre inscription ... Bonne journée.</span>
        </div>
        :
        <form>
            <label htmlFor="nom">Nom <em>*</em></label>
            <input id="nom" placeholder="Serre" autoFocus value={newRestaurateur.nom} onChange={handleChange} name='nom' required />
            <label htmlFor="prenom">Prénom <em>*</em></label>
            <input id="prenom" placeholder="Pierre" value={newRestaurateur.prenom} onChange={handleChange} name='prenom' required />
            <label><b>Adresse mail <em>*</em> </b></label>
            <input htmlFor='email' type="email" placeholder="Votre mail" value={newRestaurateur.mail} onChange={handleChange} name='mail' required/>
            <label htmlFor='password'><b>Mot de passe <em>*</em></b></label>
            <input type="password" placeholder="Entrer le mot de passe" name="motdepasse" value={newRestaurateur.password} onChange={handleChange} required />
            <input type="submit" id='submit' onClick={saveRestaurateur} />
            <div className='error'>
              {(fieldValidationErrors.error) && <label >{fieldValidationErrors.message + ' ' + fieldValidationErrors.mail }</label>}
            </div>
        </form>
        
        }
        </div>
     );
}

export default Inscription;