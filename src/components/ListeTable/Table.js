import React, { useState,useEffect } from 'react';

function Table(props) {

    const [table,setTable] = useState(props.Table)

    useEffect(() => { 
        setTable(props.Table)
    },[props.Table])

    return ( 
       
    (table.active) ?
    <button className='table active' onClick={() => props.showCommande(table.commande)}>TABLE : {table.numTable} </button>
    : <button className='table'  onClick={props.showCommande} disabled={true} >TABLE : {table.numTable} </button> 
    )
}

export default Table;