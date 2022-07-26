import React, { useState } from 'react';
import './Login.css'
import logo from '../../assets/logo.png'
import { useGestLogin } from '../../lib/useGestLogin'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [erreur,setErreur]= useState("")
    const [login,setLogin] = useState({mail:'',password:''})
    const gestLogin = useGestLogin()
    //fonction qui vérifie la validité du mail.
    const navigate = useNavigate(); 
    const goInscription = () =>{ 
      let path = `/inscription`; 
      navigate(path);
    }

    const  verifEmail = () => 
    {    
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ((login.mail) && (login.password)) {
        if (!login.mail.match(mailformat)) setErreur('ATTENTION : MAIL ERREUR !!! ')
        else 
        {
          gestLogin.login(login.mail,login.password).then((res) => 
          {
            setErreur(res.message)
            if (res.token) {
              let h = "/"
              if (props.history) {h = props.history}
              navigate(h);
            }

          })
        }
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
            </div>
            {(erreur !=='') && <div className='alert'><label >{erreur}</label></div>}

            <p><br/><br/>Je n'ai pas encore de compte?</p>
            <button onClick={goInscription}>S'inscrire</button>
        </div>
        );


}

export default Login;