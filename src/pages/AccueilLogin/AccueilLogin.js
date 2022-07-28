import './AccueilLogin.css'
import welcome from '../../assets/welcome.gif'


function AccueilLogin(){  
   
    return(
        <div id="AccueilLogin">
            <div>
          <img src={welcome} alt="welcome" className='logo' /><br/><br/>
        </div>
            <div className='ALchoices'>
                <label className='ALbienvenue'><h3>Bienvenue sur votre espace personnel !<br/>
                Sélectionnez votre restaurant dans la liste ci-dessus</h3></label>
            </div>
        </div>
    
    
    
    )
    }
    
    export default AccueilLogin