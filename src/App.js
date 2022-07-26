import { useEffect, useState } from 'react';
import Login from './components/login/Login';
import {useGestLogin} from './lib/useGestLogin'
import NavScroll from './components/Navbar/NavScroll';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnteteListTable from './components/ListeTable/EnteteListeTable';
import AjouterunElement from './components/AjouterunElement/AjouterunElement';
import AjouterunMenu from './components/AjouterunMenu/AjouterunMenu';
import AjouteruneCategorie from './components/AjouteruneCategorie/AjouteruneCategorie';
import AjoutRestaurant from './components/AjoutRestaurant/AjoutRestaurant';
import NewQRCode from './components/QR Code/QRCode';
import Inscription from './components/Inscription/Inscription'

function App() {
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
    <div>
             
      {(!isLogin) ? <Login auth={setIsLogin} /> : 
      
      <div>
      <NavScroll />
      </div>
      }
      
    </div>
    
  );
}

<BrowserRouter>
<Routes>
<Route path='/inscription' element={<Inscription/>} />
<Route path="/listetable" element={<EnteteListTable/>} />
<Route path="/ajouterunelement" element={<AjouterunElement/>} />
<Route path="/ajouterunecategorie" element={<AjouteruneCategorie/>} />
<Route path="ajouterunmenu" element={<AjouterunMenu/>} />
<Route path="genererunqrcode" element={<NewQRCode/>} />
<Route path="ajoutrestaurant" element={<AjoutRestaurant/>} />
</Routes>
</BrowserRouter>

export default App;

