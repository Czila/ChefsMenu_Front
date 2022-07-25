import React, { useEffect, useState} from 'react';
import Table from './Table';
import './ListeTable.css'

import {fetchWrapper} from '../../lib/useGestDB'

function ListeTable(props) {
    const [restaurant,setRestaurant]=useState(props.restaurant)
    const [commandes,setCommandes] = useState([])
    const [tables,setTables] = useState([])


    const tableIsActive = (nT) =>
    {
         return ((commandes.filter(commande => commande.numTable === nT )).length >0) ? true : false  
    }

    const getIdCommande = (n) =>
    {
        return (commandes.filter(commande => commande.numTable === n))
    }

    const showCommande = (C) =>
    {
        console.log(C)
        props.showCommande(C)
    }

    useEffect(() => {   
        async function updateTables() {
                const t=[]
                const C = await fetchWrapper.get(`http://localhost:3001/commande/restaurant/${restaurant._id}`)
                 setCommandes(C)
                for (let i =1 ; i< restaurant.nbTable+1; i++)      
                {   
                    t.push({numTable:i, active:tableIsActive(i),commande : getIdCommande(i)})
                }
                setTables(t)       
        }
        setRestaurant(props.restaurant)      
        if (restaurant._id) updateTables()
    },[props.restaurant]);

    return (
        
        <div className='tables'>
            {tables.map((table,index) => <Table key={table.numTable} showCommande={showCommande} Table={table} />)}
        </div>
      )

      ;
}

export default ListeTable;