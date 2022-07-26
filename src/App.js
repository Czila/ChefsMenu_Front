
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

function App() {  
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
          <Route path="/inscription" element={<Inscription />}  />

          <Route path="/ajouterunelement"  element={
              <ProtectedRoute>
                <AjouterunElement />
              </ProtectedRoute>
            }
          />
          <Route path="/ajouterunecategorie" element={<ProtectedRoute><AjouteruneCategorie /></ProtectedRoute>} />
          <Route path="/ajouterunmenu" element={<ProtectedRoute><AjouterunMenu /></ProtectedRoute>}  />
          <Route path="/listetable/:restaurantID" element={<ProtectedRoute><EnteteListTable /></ProtectedRoute>}  />
          <Route path="/ajoutrestaurant" element={<ProtectedRoute><AjoutRestaurant /></ProtectedRoute>} />
          <Route path="/genererunqrcode/:restaurantID" element={<ProtectedRoute><NewQRCode /></ProtectedRoute>} />
          <Route path="/modifierrestaurant/:restaurantID" element={<ProtectedRoute><NewQRCode /></ProtectedRoute>} />
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