import './MaCarte.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'



function MaCarte(){  
    
    
    return(
        <div id="MaCarte">
            <div>
                <img src={logo} alt="Logo" className='logo' />
            </div>
            <div className='MCchoices'>
                <label className='MCtitre'><b>Modifier la carte de mon restaurant</b></label>
            </div>
            <nav className='MCLiens'>
            <Link to="/ajouterunecategorie">Ajouter une catégorie à ma carte (entrées, plats, desserts, boissons...)</Link>
            <Link to="/ajouterunelement">Ajouter un plat, une boisson à ma carte</Link>
            <Link to="/ajouterunmenu">Ajouter un menu à ma carte</Link>
            <Link to="/visualisercarte">Visualiser ma carte</Link>
            </nav>
    </div>
    
    
    
    )
    }
    
    export default MaCarte