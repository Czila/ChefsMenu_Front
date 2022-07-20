import React, { useState } from 'react';
import './Login.css'
import logo from '../../assets/logo.png'


function Login() {
    const [erreur,setErreur]= useState("no")
    const [login,setLogin] = useState({mail:'',password:''})
    //fonction qui vérifie la validité du mail.
    const verifEmail = () => 
    {    
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ((login.mail) && (login.password)) {
        if (!login.mail.match(mailformat)) setErreur('ATTENTION : MAIL ERREUR !!! ')
        else setErreur('no Error ')
      }
      else 
      {
        if (!(login.mail)) setErreur('ATTENTION : Mail vide ')
        else setErreur('ATTENTION : Bad PASSWORD ' )
      }
    }

    const handleChange = (e) => {
      const name = e.currentTarget.name
      const value = e.currentTarget.value
      console.log(name)
      setLogin({...login, [name]:value})
    }

    return (
        <div id='loginForm'>
            <div>
              <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='formDiv'>
                <div className='inputDiv'>
                  <label><b>Adresse mail </b></label>
                  <input type="email" placeholder="Votre mail" value={login.mail} onChange={handleChange} name='mail' multiple  required/>
                  <label><b>Mot de passe</b></label>
                  <input type="password" placeholder="Entrer le mot de passe" name="password" onChange={handleChange} value={login.password} required />
                </div>
                <div className='buttonDiv'>
                  <input type="submit" id='submit' onClick={verifEmail} />

                </div>
                  <label className='alert' hidden>{erreur}</label>
            </div>

        </div>

        );
}

export default Login;