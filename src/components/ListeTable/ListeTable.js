import React, { useEffect, useState } from 'react';
import Table from './Table';
import './ListeTable.css'

import {fetchWrapper} from '../../lib/useGestDB'

function ListeTable() {
    const idRestaurant='62d96bb9d4455394b2a619c7'
    const [commandes,setCommandes] = useState([])
    const [restaurant,setRestaurant] = useState({})
    const [tables,setTables] = useState([])
    const [update,setUpdate]=useState(false)


    const tableIsActive = (nT) =>
    {
         return ((commandes.filter(commande => commande.numTable === nT )).length >0) ? true : false  
    }

    const getIdCommande = (n) =>
    {
        return (commandes.filter(commande => commande.numTable === n))
    }


    useEffect(() => {   
        (async function() {
            const t=[]

             let R = await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`)
             setRestaurant(R)

             const C = await fetchWrapper.get(`http://localhost:3001/commande/restaurant/${idRestaurant}`)
             setCommandes(C)
           
            for (let i =1 ; i< restaurant[0].nbTable+1; i++)      
            {   
                t.push({numTable:i, active:tableIsActive(i),commande : getIdCommande(i)})
            }
            setTables(t)

        })()

    }, [update]);

    return ( 
        
    <div>
        
        <label>Vos tables pour le restaurant : {restaurant[0].nom} </label> <button onClick={()=> setUpdate(true)}>Afficher</button>
        <div className='tables'>
        <div>
            {tables.map((table,index) => <Table key={index} Table={table} />)}
          
        </div>
      </div> 
    </div>);
}

export default ListeTable;