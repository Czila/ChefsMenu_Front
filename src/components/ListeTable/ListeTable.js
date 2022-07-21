import React, { Component } from 'react';
import './ListeTable.css'

function ListeTable() {
    const nbtable = 10

    const displayTable =() => {
        let divs= [];
        for (let i = 0; i< nbtable; i++)
        {
            divs.push(<button className='table' disabled={true} >TABLE : {i} </button>)
        }
        for (let i = 0; i< nbtable; i++)
        {
            divs.push(<button className='table active'>TABLE : {i} </button>)
        }
        return divs

    }

    return ( 
        
    <div><label>Vos tables : </label>
    <div className='tables'>
            {displayTable()}

    </div> 
    </div>);
}

export default ListeTable;