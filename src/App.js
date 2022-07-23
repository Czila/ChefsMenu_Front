import { useEffect, useState } from 'react';

import Login from './components/login/Login';
import { Routes, Route} from "react-router-dom";
import {useGestLogin} from './lib/useGestLogin'
//import AjouterunElement from './components/AjouterunElement/AjouterunElement';
import Inscription from './components/Inscription/Inscription';
import NouvelleCarte from './components/NouvelleCarte/NouvelleCarte';
//import QRCode from './components/QR Code/QRCode'
//import GenererunQRCode from './pages/GenererunQRCode/GenererunQRCode';
import AccueilLogin from './pages/AccueilLogin/AccueilLogin';
import AjouteruneCategorie from './components/AjouteruneCategorie/AjouteruneCategorie';
import EnteteListTable from './components/ListeTable/EnteteListeTable';
//import AjoutRestaurant from './components/AjoutRestaurant';


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
        <EnteteListTable />
        <button onClick={()=> logOut() }>Logout</button>
      </div>
      }

    </div>
  );
}

export default App;

/* <Route path="ajouterunmenu" element={<AjouterunMenu />} />
        <Route path="ajouterunelement" element={<AjouterunElement />} />
        <Route path="modifiermacarte" element={<MaCarte />} />
        <Route path="visualisercarte" element={<PreviewMaCarte />} />
                <Route path="ajoutrestaurant" element={<AjoutRestaurant />} />  
                        <Route path="qrcode" element={<QRCode />} />
        <Route path="genererqrcode" element={<GenererunQRCode />} /> */
