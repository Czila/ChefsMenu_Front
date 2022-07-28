import './MaCarte.css'
import carte from '../../assets/carte.png'




function MaCarte(){  


    return(
        <div id="MaCarte">
            <div>
                <img src={carte} alt="Logo" className='logo' />
                <label><h4>Restaurant sélectionné</h4></label>
            </div>


            <div>
                <h2>Menus disponibles : </h2><br/>
                    <p>Liste des menus</p>
                <h2>A la Carte : </h2><br/>
                    <p>Liste des éléments à la carte avec un select par catégorie</p>
                
            </div>
                    
    

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