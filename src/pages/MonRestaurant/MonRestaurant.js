import './MonRestaurant.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'



function MonRestaurant(){  
    
    
    return(
        <div id="MonRestaurant">
            <div>
                <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='MRchoices'>
                <label className='MRtitre'><b>"Nom du restaurant sélectionné"</b></label>
            </div>
            <nav className='MRLiens'>
            <Link to="/nouvellecarte">Créer une nouvelle carte</Link> 
            <Link to="/macarte">Modifier ma Carte</Link>
            <Link to="/genererqrcode">Générer les QR Codes de mon restaurant</Link>
            <Link to="/modifierresto">Modifier les informations de mon restaurant</Link>
            </nav>
    </div>
    
    
    
    )
    }
    
    export default MonRestaurant