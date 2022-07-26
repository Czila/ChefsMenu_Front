import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGestLogin} from '../../lib/useGestLogin';
import { useEffect, useState } from 'react';
import NavLink from 'react-bootstrap/esm/NavLink';



function NavScroll() {

  const gestLogin = useGestLogin()
  const [isLogin,setIsLogin] = useState(false)
  

  const logOut =() => {
    gestLogin.logout()
    setIsLogin(gestLogin.getState())
  }
  
  useEffect(() => {
    setIsLogin(gestLogin.getState())
  })

  return (
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <img src={logo} alt="Logo" className='logo' />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Mes restaurants" id="basic-nav-dropdown">
              <NavDropdown.Item href="monrestaurant">Mon restaurant 1</NavDropdown.Item>
              <NavDropdown.Item href="monrestaurant">Mon restaurant 2</NavDropdown.Item>
              <NavDropdown.Item href="monrestaurant">Mon restaurant 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/ajoutrestaurant">
                Créer un restaurant
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Ma Carte" id="basic-nav-dropdown">
              <NavDropdown.Item href="previewcarte">Ma carte</NavDropdown.Item>
              <NavDropdown.Item href="nouvellecarte">
                Nouvelle Carte
              </NavDropdown.Item>
              <NavDropdown.Item href="modifiermacarte">
                Modifier ma Carte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/ajouterunelement">Ajouter un élément</NavDropdown.Item>
              <NavDropdown.Item href="/ajouterunecategorie">Ajouter une catégorie</NavDropdown.Item>
              <NavDropdown.Item href="/ajouterunmenu">Créer un menu</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/listetable">Mes tables</Nav.Link>
            <Nav.Link href="/genererunqrcode">Mes QR Codes</Nav.Link>
            <Nav.Link href="modifiermonrestaurant">Modifier mon restaurant</Nav.Link>
            </Nav>
            <NavDropdown title="Rimbaud Thierry" id="basic-nav-dropdown">
              <NavDropdown.Item href="modifiermoncompte">Modifier mon compte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="logout" onClick={()=> logOut() }>Log out</NavDropdown.Item>
            </NavDropdown>
            
            
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );


}




export default NavScroll;


  <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>