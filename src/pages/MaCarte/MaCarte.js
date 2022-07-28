import './MaCarte.css'
import carte from '../../assets/carte.png'
import {useGestLogin} from '../../lib/useGestLogin';
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'
import { useNavigate } from "react-router-dom";



function MaCarte(){  

    const navigate = useNavigate(); 
    const gestLogin = useGestLogin()
    const [isLogin,setIsLogin] = useState(false)
    const [restaurants,setRestaurants]= useState([])
    const idRestaurateur=localStorage.getItem("userId");
    const [currentRestaurant,setCurrentRestaurant]= useState(0)
    const [deMenu,setDeMenu]=useState(true)
    const[menus, setMenus] = useState('')
    const params = useParams();
    let idRestaurant =params.restaurantID
    const [categories,setCategories]=useState([{}])
    const [categorie,setCategorie]=useState('')
    const [elementsDispoInit,setElementsDispoInit]=useState([{}])
    const [elementsDispo,setElementsDispo]=useState([{}])
    const [fieldValidationErrors,setFieldValidationErrors] = useState({
        message:'',
        error:false})

    
    const getMyRestaurant = async () => {
            const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}`))
            setRestaurants(R)
          }
      

    const getMyMenus = async () => {
        const menus = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}/menu`))
        setMenus(menus)
    }
    
    useEffect(() => {
      setIsLogin(localStorage.getItem("token"))

      if ((!currentRestaurant) && localStorage.getItem('CurrentRestaurant') )  {
        setCurrentRestaurant(localStorage.getItem('CurrentRestaurant'))
        setDeMenu(false)
      }
  
    },[localStorage.getItem("token")])

const updateCat = (c) => 
{
    if (c === '')  setElementsDispo(elementsDispoInit)
    else {
    const dispo = elementsDispoInit
    setElementsDispo(dispo.filter(el => el.categorie===c))
}
}

    const handleChange = (e) => {
        const name = e.currentTarget.name
        if (name=== 'categorie') 
        {
            updateCat(e.target.value)
        }
    }

   
    return(
        <div id="MaCarte">
            <div>
                <img src={carte} alt="Logo" className='logo' />
                <label><h4>{`${currentRestaurant}`}</h4></label>
            </div>


            <div>
            <h2>Menus disponibles : </h2><br/>

            {menus.map((menu) => 
                                <p value={menu.nom} key={menu._id}>{menu.nom} </p>
                            )}


                        
            <h2>A la Carte : </h2><br/>
                        <div>
                        Filtre : &ensp;
                        <select  value={categorie}  name="categorie" onChange={handleChange}>
                            <option></option>
                            {categories.map((cat) => 
                                <option value={cat.nom} key={cat._id}>{cat.nom} </option>
                            )}
                            </select><br/><br/>
                    </div>
                        <table className='tableItem'>
                            <thead>
                                <tr className='cattableau'>
                                    <th>Nom de l'élément</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Prix HT</th>
                                    <th></th>
                                </tr>
                            </thead>
                        <tbody>

                            {
                            (elementsDispo) &&
                            elementsDispo.map((element) =>                        
                            <tr key={element._id}>
                                <td >{element.nom}</td>
                                <td >{element.description}</td>
                                <td >{element.categorie}</td>
                                <td >{element.prix_HT}</td>
                            </tr> )

                            }
                        </tbody>
                        </table>
                    </div><br/><br/><br/>
                    
    

    </div>
    )};
    
    
    
    
    
    
    export default MaCarte


    /*    
const updateMenu = (e) =>{
    const dispo = elementsDispo
    const dispoInit = elementsDispoInit
    setTotalBrut(totalBrut+e.prix_HT)
    setMenuActuel(menuActuel => [...menuActuel, e])
    dispo.splice(dispo.indexOf(e), 1)
    dispoInit.splice(dispoInit.indexOf(e), 1)
    setElementsDispo(dispo)
    setElementsDispoInit(dispoInit)
}


const updateBD = async () => {
    const url = 'http://localhost:3001/menu'
    try {
        await fetchWrapper.post(url,{nom, prix_HT:totalNet, remise,idRestaurant,elements:menuActuel})
        setFin(true)
    }
    catch(err)
    {
        setFieldValidationErrors({message : err, error:true})
    }

}

  
    const logOut =() => {
      gestLogin.logout()
      setIsLogin(gestLogin.getState())
      navigate(`/`);
    }
  
    const onRestaurantClick = (id) => {
      setCurrentRestaurant(id)
      localStorage.setItem("CurrentRestaurant",id);
      navigate(`/listetable/${id}`);
      setDeMenu(false)
    }
  
    


const delMenuActuelEl = (e) =>{
    const actuel = menuActuel
    const newBrut = totalBrut-e.prix_HT
    actuel.splice(actuel.indexOf(e), 1)
    setMenuActuel(actuel)
    setElementsDispo(elementsDispo => [...elementsDispo, e])
    setElementsDispoInit(elementsDispoInit => [...elementsDispoInit, e])
    setTotalBrut(newBrut)
}
*/