import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import petitlogo from '../../assets/petitlogo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGestLogin} from '../../lib/useGestLogin';
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'
import { useNavigate } from "react-router-dom";


function NavScroll(props) {
  const navigate = useNavigate(); 
  const gestLogin = useGestLogin()
  const [isLogin,setIsLogin] = useState(false)
  const [restaurants,setRestaurants]= useState([])
  const idRestaurateur=localStorage.getItem("userId");
  const [restaurateur,setRestaurateur]=useState({})
  const [currentRestaurant,setCurrentRestaurant]= useState(0)
  const [deMenu,setDeMenu]=useState(true)

  const logOut =() => {
    gestLogin.logout()
    setIsLogin(gestLogin.getState())
    navigate(`/`);
  }

  const onRestaurantClick = (id) => {
    setCurrentRestaurant(id)
    localStorage.setItem("CurrentRestaurant",id);
    navigate(`/listetable/${idRestaurateur}/${id}`);
    setDeMenu(false)
  }

  
  const getMyRestaurant = async () => {
    const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}`))
    setRestaurants(R)

  }
  
  const getRestaurateurInfos = async () => {
    const R = (await fetchWrapper.get(`http://localhost:3001/restaurateur/${idRestaurateur}`))
    setRestaurateur(R[0])
  }

  useEffect(() => {
    setIsLogin(localStorage.getItem("token"))
  
    if(idRestaurateur) {getMyRestaurant()
      getRestaurateurInfos()
    }
    if ((!currentRestaurant) && localStorage.getItem('CurrentRestaurant') )  {
      setCurrentRestaurant(localStorage.getItem('CurrentRestaurant'))
      setDeMenu(false)
    }

  },[localStorage.getItem("token")])

  return (
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <img src={petitlogo} alt="Logo" className='logo' />
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
        {(isLogin) ?
          <Nav className="me-auto">
          <NavDropdown title="🍽️ Mes restaurants" id="basic-nav-dropdown">
              {restaurants.map((restaurant)=> 
                <NavDropdown.Item key={restaurant._id} onClick={() => onRestaurantClick(restaurant._id)} href="#">{restaurant.nom}</NavDropdown.Item>
              )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="/ajoutrestaurant">
                Créer un restaurant
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title='Carte' id="basic-nav-dropdown" disabled={deMenu}>
              <NavDropdown.Item href="previewcarte">Afficher carte </NavDropdown.Item>
              <NavDropdown.Item href="nouvellecarte">
              ➕ Nouvelle Carte
              </NavDropdown.Item>
              <NavDropdown.Item href="modifiermacarte">
              ✏️ Modifier ma Carte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/ajouterunelement/${currentRestaurant}`} disabled={deMenu}>➕ Ajouter un élément</NavDropdown.Item>
              <NavDropdown.Item href={`/ajouterunecategorie/${currentRestaurant}`}>➕ Ajouter une catégorie</NavDropdown.Item>
              <NavDropdown.Item href={`/ajouterunmenu/${currentRestaurant}`}>➕ Créer un menu</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/supprimerelement/${currentRestaurant}`}>❌ Supprimer un élement/catégorie/menu</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href={`/listetable/${currentRestaurant}`} disabled={deMenu}>Mes tables</Nav.Link>
            <Nav.Link href={`/genererunqrcode/${currentRestaurant}`} disabled={deMenu}>Mes QR Codes</Nav.Link>
            <Nav.Link href={`/modifierrestaurant/${currentRestaurant}`} disabled={deMenu}>Modifier mon restaurant</Nav.Link>
            </Nav>
          :
          <Nav className="me-auto">
            <Nav.Link href={`/nosrestaurants}`} >Nos Restaurants</Nav.Link>
            <Nav.Link href={`/about}`} >Qui qui qui ??</Nav.Link>
          </Nav>
          }
            {(isLogin) ?
            
            <NavDropdown title={`👤 ${restaurateur.nom} ${restaurateur.prenom}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="/modifiermoncompte">Modifier mon compte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={()=> logOut() }>Log out</NavDropdown.Item>
            </NavDropdown>
            :
            <Nav>
              <Nav.Link href={`/login`} disabled={deMenu}>Login</Nav.Link> 
              <Nav.Link href={`/inscription`} disabled={deMenu}>Inscription</Nav.Link> 
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
<div>

</div>


export default NavScroll;

