import React, { useState,useEffect } from 'react';

import {useParams} from 'react-router-dom';

import {fetchWrapper} from '../../lib/useGestDB'
import ListeTable from './ListeTable';
import Commande from '../Commande/Commande';

function EnteteListTable() {
    const params = useParams();
    let idRestaurant =params.restaurantID
    const [restaurant,setRestaurant] = useState({})
    const [showList,setShowList] = useState(true)
    const [currentCommande,setCurrentCommande] = useState({})

    async function getRestaurant() {
        const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))[0]
        setRestaurant(R)
    }

    const showCommande = (c) => {
        setShowList(false)
        setCurrentCommande(c)
    }

    useEffect(() => {   
        getRestaurant()
    }, [idRestaurant,showList]);
    return (  
        <div>
            {(showList) ?
            <div>
                <h4 className='titreresto'>&ensp; Vos tables pour le restaurant :  {restaurant.nom} </h4> 
                <div>
                {restaurant._id && <ListeTable showCommande={showCommande} restaurant={restaurant}/>}
                </div>
            </div>
            
            :
            <div className='commandeDetail'>
                <button onClick={() => setShowList(true)}> ⬅️ Retour liste tables</button>
                <Commande commande={currentCommande}></Commande>
            </div>
            
            }
        </div>
    );
}

export default EnteteListTable;