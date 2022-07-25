import React, { useState,useEffect } from 'react';


import {fetchWrapper} from '../../lib/useGestDB'
import ListeTable from './ListeTable';
import Commande from '../Commande/Commande';

function EnteteListTable() {
    const idRestaurateur ='62d6b04be6b9a14f00c98ec7'
    const [restaurant,setRestaurant] = useState({})
    const [showList,setShowList] = useState(true)
    const [currentCommande,setCurrentCommande] = useState({})

    async function getRestaurant() {
        const R = (await fetchWrapper.get(`http://localhost:3001/restaurant/byOwner/${idRestaurateur}`))[0]
        setRestaurant(R)
    }

    const showCommande = (c) => {
        setShowList(false)
        setCurrentCommande(c)
    }

    useEffect(() => {   
        getRestaurant()
    }, [restaurant._id,showList]);
    return (  
        <div>
            {(showList) ?
            <div>
                <label>Vos tables pour le restaurant :  {restaurant.nom} </label> 
                <div className='restaurant'>
                <ListeTable showCommande={showCommande} restaurant={restaurant}/>
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