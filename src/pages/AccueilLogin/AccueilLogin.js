import './AccueilLogin.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'



function AccueilLogin(){  
    
    
    return(
        <div id="AccueilLogin">
            <div>
                <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='ALchoices'>
                <label className='ALbienvenue'><b>Bienvenue (restaurateur)</b></label>
            </div>
            <nav className='ALLiens'>
            <Link to="/creerresto">Créer un nouveau restaurant</Link>
            <Link to="/about">Mes restaurants</Link>
            <Link to="/modifierresto">Modifier mes restaurants</Link>
            <Link to="/modifierinfos">Modifier les informations de mon compte</Link>
            </nav>
    </div>
    
    
    
    )
    }
    
    export default AccueilLogin