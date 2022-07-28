
import NavScroll from './components/Navbar/NavScroll';
import {Navigate, Route,  Routes} from 'react-router-dom';
import Login from './components/login/Login';
import EnteteListTable from './components/ListeTable/EnteteListeTable';
import AjouterunElement from './components/AjouterunElement/AjouterunElement';
import Inscription from './components/Inscription/Inscription'
import AjouteruneCategorie from './components/AjouteruneCategorie/AjouteruneCategorie'
import AjouterunMenu from './components/AjouterunMenu/AjouterunMenu';
import AccueilLogin from './pages/AccueilLogin/AccueilLogin';
import AjoutRestaurant from './components/AjoutRestaurant/AjoutRestaurant'
import NewQRCode from './components/NewQRCode/NewQRCode'
import ChangerMotDepasse from './components/ChangerMotDepasse/ChangerMotDepasse'
import { useState } from 'react';

function App() {  
const [currentRestaurantId,setCurrentRestaurantId]=useState('')

  const ProtectedRoute = ({ children }) => {
    const user =localStorage.getItem("token")
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  const requireAuth =() => { return ('test')}
  return (
    <div>
        <NavScroll />
        <Routes>
        <Route path="/" onEnter={requireAuth} element={
              <ProtectedRoute>
                <AccueilLogin />
              </ProtectedRoute>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/changePass/:token" element={<ChangerMotDepasse />} />
          <Route path="/inscription" element={<Inscription />}  />

          <Route path="/ajouterunelement/:restaurantID"  element={
              <ProtectedRoute>
                <AjouterunElement />
              </ProtectedRoute>
            }
          />
          <Route path="/ajouterunecategorie/:restaurantID" element={<ProtectedRoute><AjouteruneCategorie /></ProtectedRoute>} />
          <Route path="/ajouterunmenu/:restaurantID" element={<ProtectedRoute><AjouterunMenu /></ProtectedRoute>}  />
          <Route path="/listetable/:restaurantID" element={<ProtectedRoute><EnteteListTable /></ProtectedRoute>}  />
          <Route path="/ajoutrestaurant" element={<ProtectedRoute><AjoutRestaurant /></ProtectedRoute>} />
          <Route path="/genererunqrcode/:restaurantID" element={<ProtectedRoute><NewQRCode /></ProtectedRoute>} />
          <Route path="/modifierrestaurant/:restaurantID" element={<ProtectedRoute><NewQRCode /></ProtectedRoute>} />
        </Routes>
    </div>  
  );
}



export default App;

