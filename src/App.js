import { useEffect, useState } from 'react';
import NavScroll from './components/Navbar/NavScroll';
import {BrowserRouter as Router, Route,  Routes} from 'react-router-dom';

import Login from './components/login/Login';
import EnteteListTable from './components/ListeTable/EnteteListeTable';
import AjouterunElement from './components/AjouterunElement/AjouterunElement';
import {useGestLogin} from './lib/useGestLogin'
import Inscription from './components/Inscription/Inscription'
import AjouteruneCategorie from './components/AjouteruneCategorie/AjouteruneCategorie'
import AjouterunMenu from './components/AjouterunMenu/AjouterunMenu';
import AccueilLogin from './pages/AccueilLogin/AccueilLogin';
import AjoutRestaurant from './components/AjoutRestaurant/AjoutRestaurant'
import NewQRCode from './components/NewQRCode/NewQRCode'
function App() {
  
  function requireAuth(nextState, replace, next) {
    if (!localStorage.getItem("userId")) {
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }



  return (
    <div>
 
        <NavScroll />
  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AccueilLogin />} onEnter={requireAuth}  />
          <Route path="/ajouterunelement" element={<AjouterunElement />} onEnter={requireAuth} />
          <Route path="/ajouterunecategorie" element={<AjouteruneCategorie />} onEnter={requireAuth} />
          <Route path="/ajouterunmenu" element={<AjouterunMenu />} onEnter={requireAuth} />
          <Route path="/inscription" element={<Inscription />}  />
          <Route path="/listetable/:userID/:restaurantID" element={<EnteteListTable />} onEnter={requireAuth} />
          <Route path="/ajoutrestaurant" element={<AjoutRestaurant />} onEnter={requireAuth}  />
          <Route path="/genererunqrcode/:restaurantID" element={<NewQRCode />} onEnter={requireAuth}  />

        </Routes>
    </div>
  
  );
}

export default App;

/*      <Route path="ajouterunelement" element={<AjouterunElement />} />
        <Route path="modifiermacarte" element={<MaCarte />} />
        <Route path="ajouterunmenu" element={<AjouterunMenu />} />
        <Route path="visualisercarte" element={<PreviewMaCarte />} />
        <Route path="ajoutrestaurant" element={<AjoutRestaurant />} />
                <Route path="qrcode" element={<QRCode />} />
        <Route path="genererqrcode" element={<GenererunQRCode />} />   */