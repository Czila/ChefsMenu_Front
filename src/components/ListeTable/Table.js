import React, { useState,useEffect } from 'react';


function Table(props) {

    const [table,setTable] = useState(props.Table)

    const showCommande = () => {
        console.log("commande num : ",table.commande)
    }


    useEffect(() => { 
        setTable(props.Table)
    },[props.Table])

    return ( 
       
    (table.active) ?
    <button className='table active' onClick={showCommande}>TABLE : {table.numTable} </button>
    : <button className='table'  onClick={showCommande} disabled={true} >TABLE : {table.numTable} </button> 
    )

}

export default Table;