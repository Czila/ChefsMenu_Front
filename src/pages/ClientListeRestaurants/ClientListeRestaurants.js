import { useEffect, useState } from 'react';

import {fetchWrapper} from '../../lib/useGestDB'
import { useNavigate } from "react-router-dom";
import './ClientListeRestaurants.css'


function ClientListeRestaurant() {
    const [restaurants,setRestaurants] = useState([])
    const navigate = useNavigate(); 

    const getRestaurants = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/`))
        setRestaurants(NR)
     }

     const goToCarte = (id) =>{ 
        console.log('go')
        let path = `/carte/`+id; 
        navigate(path);
      }

    useEffect( () => {
        getRestaurants()
    }, []) 

    return ( 
        <div className="listRestaurant">
            <h1>Bienvenue voici la liste de nos restaurants partenaire</h1>
            
            <div className="listR">
                {restaurants.map((restaurant) => 
                <div key={restaurant._id} className="R">
                    <h2> {restaurant.nom} </h2>
                    <img id='imgRestaurant' alt='image restaurant' src={`http://localhost:3001/restaurant/getPicture/${restaurant._id}`}  />
                    <span>{restaurant.adresse} </span>
                    <span>{restaurant.vp} {restaurant.ville} </span>
                    <br/>
                    <button onClick={()=>goToCarte(restaurant._id)} className='btCarte'>la carte</button>
                </div>
                )}
            </div>
        </div>


     );
}

export default ClientListeRestaurant;