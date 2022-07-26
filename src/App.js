import { useEffect, useState } from 'react';

import Login from './components/login/Login';

import {useGestLogin} from './lib/useGestLogin'

import NavScroll from './components/Navbar/NavScroll';

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

export default App;

/*      <Route path="ajouterunelement" element={<AjouterunElement />} />
        <Route path="modifiermacarte" element={<MaCarte />} />
        <Route path="ajouterunmenu" element={<AjouterunMenu />} />
        <Route path="visualisercarte" element={<PreviewMaCarte />} />
        <Route path="ajoutrestaurant" element={<AjoutRestaurant />} />
                <Route path="qrcode" element={<QRCode />} />
        <Route path="genererqrcode" element={<GenererunQRCode />} />   */