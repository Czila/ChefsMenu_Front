function Table(props) {
    return ((props.table.active) ?
    <button className='table active' onClick={() => props.showCommande(props.table.commande)}>{props.table.numTable} </button>
    : <button className='table'  onClick={props.showCommande} disabled={true} >{props.table.numTable} </button> 
    )
}
export default Table;