import React, { useEffect, useState} from 'react';
import Table from './Table';
import './ListeTable.css'

import {fetchWrapper} from '../../lib/useGestDB'

function ListeTable(props) {
    const [tables,setTables] = useState([])
    const tableIsActive = (nT,c) =>
    {
         return (c.filter(commande => commande.numTable === nT )).length >0 
    }

    const getIdCommande = (n,c) =>
    {
        return (c.filter(commande => commande.numTable === n))
    }

    const showCommande = (C) =>
    {
        console.log(C)
        props.showCommande(C)
    }

    async function updateTables() {
        const t=[]
        const coms = await fetchWrapper.get(`http://localhost:3001/commande/restaurant/${props.restaurant._id}`)
        for (let i =1 ; i< props.restaurant.nbTable+1; i++)      
        {   
            t.push({numTable:i, active:tableIsActive(i,coms),commande : getIdCommande(i,coms)})
        }
        setTables(t)    
    }

    useEffect(() => {   
 
    if (props.restaurant._id) updateTables()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className='tables'>
            {tables.map((table,index) => <Table key={table.numTable} showCommande={showCommande} table={table} />)}
        </div>
      )
      ;
}

export default ListeTable;