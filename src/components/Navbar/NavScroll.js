import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGestLogin} from '../../lib/useGestLogin';
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'
import { useNavigate } from "react-router-dom";

function NavScroll() {
  const navigate = useNavigate(); 
  const gestLogin = useGestLogin()
  const [isLogin,setIsLogin] = useState(false)
  const [restaurants,setRestaurants]= useState([])
  const idRestaurateur=localStorage.getItem("userId");
  const [currentRestaurant,setCurrentRestaurant]= useState(0)
  const [deMenu,setDeMenu]=useState(true)

  const logOut =() => {
    gestLogin.logout()
    setIsLogin(gestLogin.getState())
  }

  const onRestaurantClick = (id) => {
    setCurrentRestaurant(id)
    navigate(`/listetable/${idRestaurateur}/${id}`);
  }

  
  const getMyRestaurant = async () => {
    console.log(idRestaurateur)
    const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}`))
    setRestaurants(R)
    setDeMenu(false)
  }
  
  useEffect(() => {
    setIsLogin(gestLogin.getState())
    getMyRestaurant()

    console.log(deMenu)
  },[isLogin,currentRestaurant])

  return (
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <img src={logo} alt="Logo" className='logo' />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Mes restaurants" id="basic-nav-dropdown">
              {restaurants.map((restaurant)=> 
                <NavDropdown.Item key={restaurant._id} onClick={() => onRestaurantClick(restaurant._id)} href="#">{restaurant.nom}</NavDropdown.Item>
              )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="/ajoutrestaurant">
                Créer un restaurant
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Carte" id="basic-nav-dropdown" disabled={deMenu}>
              <NavDropdown.Item href="previewcarte">Afficher carte</NavDropdown.Item>
              <NavDropdown.Item href="nouvellecarte">
                Nouvelle Carte
              </NavDropdown.Item>
              <NavDropdown.Item href="modifiermacarte">
                Modifier ma Carte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/ajouterunelement" disabled={deMenu}>Ajouter un élément</NavDropdown.Item>
              <NavDropdown.Item href="/ajouterunecategorie">Ajouter une catégorie</NavDropdown.Item>
              <NavDropdown.Item href="/ajouterunmenu">Créer un menu</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href={`/listetable/${idRestaurateur}/${currentRestaurant}`} disabled={deMenu}>Mes tables</Nav.Link>
            <Nav.Link href="/genererunqrcode/${currentRestaurant}" disabled={deMenu}>Mes QR Codes</Nav.Link>
            <Nav.Link href="/modifierrestaurant" disabled={deMenu}>Modifier mon restaurant</Nav.Link>
            </Nav>
            <NavDropdown title="Rimbaud Thierry" id="basic-nav-dropdown">
              <NavDropdown.Item href="/modifiermoncompte">Modifier mon compte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="logout" onClick={()=> logOut() }>Log out</NavDropdown.Item>
            </NavDropdown>
            
            
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );


}
<div>

</div>


export default NavScroll;

