import { useEffect, useState } from 'react';

import Login from './components/login/Login';

import {useGestLogin} from './lib/useGestLogin'

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
    <div >
      {(!isLogin) ? <Login auth={setIsLogin} /> : 
      <div>
        <label>log</label>
        <button onClick={()=> logOut() }>Logout</button>
      </div>
      }
    </div>
  );
}

export default App;
