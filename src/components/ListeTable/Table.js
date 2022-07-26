function Table(props) {
    console.log(props.table.commande)
    return ((props.table.active) ?
    <button className='table active' onClick={() => props.showCommande(props.table.commande)}>TABLE : {props.table.numTable} </button>
    : <button className='table'  onClick={props.showCommande} disabled={true} >TABLE : {props.table.numTable} </button> 
    )
}
export default Table;