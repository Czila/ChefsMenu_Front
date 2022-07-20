import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/Login';



function App() {
  const [token] = useState("")
  const [userId] = useState("")
  const [flagLogin] = useState(false)



  return (
    <div className="App">
      {(!flagLogin) ? <Login /> : <label>log</label>}
    </div>
  );
}

export default App;
