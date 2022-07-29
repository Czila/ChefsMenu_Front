import React, { useState } from 'react';
import './Login.css'
import animationentree from '../../assets/animationentree.gif'
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
          setErreur(err)
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
              let h = "/AccueilLogin"
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
              <h3> 📧 Un mail avec les instructions pour réinitialiser votre mot de passe vient de partir !!!</h3>
            </div>
            :
            <div id='loginDiv'>
              <div>
                <img src={animationentree} alt="animationentree" className='logo' />
              </div>
              <div className='formDiv'>
                <div className='inputDiv'>
                    <label><h4>Adresse mail </h4></label>
                    <input className='input' type="email" placeholder="Votre mail" value={login.mail} onChange={handleChange} name='mail' multiple  required/>
                    <label><h4>Mot de passe</h4></label>
                    <input className='input' type="password" placeholder="Entrer le mot de passe" name="password" onChange={handleChange} value={login.password} required />
                    <br/>
                    <button className='buttonstyle' type="submit" id='submit' onClick={verifEmail} value='Connexion'>C'est parti !</button>  
                    <br/>
                    {(erreur !=='') && <div className='alert'><label >{erreur}</label></div>}
                    <a href="#" onClick={() => lostPass()} className='lost'>Mot de passe oublié</a>
                    <a href="#" onClick={() => goInscription()} className='new'>Je n'ai pas encore de compte?</a>
                  </div>
              
                <div className='buttonDiv'>
                  
                </div>
              </div>
              
             </div>
          }
        </div>
        );


}

export default Login;