import React, { useState } from 'react';
import './Login.css'
import logo from '../../assets/logo.png'
import { useGestLogin } from '../../lib/useGestLogin'
import { useNavigate } from "react-router-dom";
import { fetchWrapper } from '../../lib/useGestDB';

function Login(props) {
    const [erreur,setErreur]= useState("")
    const [login,setLogin] = useState({mail:'',password:''})
    const gestLogin = useGestLogin()
    const [finReset,setFinReset]=useState(false)
    const navigate = useNavigate(); 
    const goInscription = () =>{ 
      let path = `/inscription`; 
      navigate(path);
    }

    const  lostPass = async () => {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!login.mail.match(mailformat)) setErreur('ATTENTION : mail non valide !!! ')
      else {
        const url = 'http://localhost:3001/restaurateur/resetpass/'
        try {
            await fetchWrapper.post(url,{mail:login.mail})
            setFinReset(true)
        }
        catch(err)
        {
          console.log('ee')
          console.log(err.message)
          setErreur('ATTENTION : erreur DB!!! ')
        }
      }

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
            {(finReset) ?
            <div>
              <h3> 📧 Un mail avec les instructions pour réinitialiser votre mot de passe viens de partir !!!</h3>
            </div>
            :
            <div>
              <div>
                <img src={logo} alt="Logo" className='logo' />
              </div>
              <div className='formDiv'>
                <div className='inputDiv'>
                    <label><b>Adresse mail </b></label>
                    <input type="email" placeholder="Votre mail" value={login.mail} onChange={handleChange} name='mail' multiple  required/>
                    <label><b>Mot de passe</b></label>
                    <input type="password" placeholder="Entrer le mot de passe" name="password" onChange={handleChange} value={login.password} required />
                    <br/>
                    <a href="#" onClick={() => lostPass()}>Récuperer mon mot de passe</a>
                  </div>
                <div className='buttonDiv'>
                  <input type="submit" id='submit' onClick={verifEmail} value='Connexion'/>
                </div>
              </div>
              {(erreur !=='') && <div className='alert'><label >{erreur}</label></div>}
              <p><br/><br/>Je n'ai pas encore de compte?</p>
              <button onClick={goInscription}>S'inscrire</button>
            </div>
          }
        </div>
        );


}

export default Login;