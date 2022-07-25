import React, { useState,useEffect } from 'react';


import {fetchWrapper} from '../../lib/useGestDB'
import ListeTable from './ListeTable';
import Commande from '../Commande/Commande';

function EnteteListTable() {
    const idRestaurateur ='62d6b04be6b9a14f00c98ec7'
    const [restaurant,setRestaurant] = useState({})
    const [afficher] =useState(true)

    async function getRestaurant() {
        const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}`))[0]
        setRestaurant(R)
    }

    useEffect(() => {   
        getRestaurant()
    }, [restaurant._id]);
    return (  
        <div>
            <label>Vos tables pour le restaurant :  {restaurant.nom} </label> 
            <div className='restaurant'>
                {(idRestaurateur) &&<ListeTable restaurant={restaurant} afficher={afficher}/> }
            </div>
            <div className='commandeDetail'>
                <Commande></Commande>
            </div>
            </div>
    );
}

export default EnteteListTable;