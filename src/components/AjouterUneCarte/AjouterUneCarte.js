import React, { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';
import { fetchWrapper } from '../../lib/useGestDB';
import './AjouterUneCarte.css'


function AjouterUneCarte() {
    const params = useParams();
    let idRestaurant =params.restaurantID
   
    const [fin,setFin]=useState(false)
    const [elementsDispo,setElementsDispo]=useState([{}])
    const [menus,setMenus]=useState([])
    const [menuDispo,setMenuDispo]=useState([])
    const [elements,setElements]=useState([])

    const addElementToCarte = (e) => {
        const dispo = elementsDispo 
        dispo.splice(dispo.indexOf(e), 1)
        setElements(elements => [...elements,e])
        setElementsDispo(dispo)
    }
    const addMenuToCarte = (e) => {
        const dispo = menuDispo 

        dispo.splice(dispo.indexOf(e), 1)
        setMenus(elements => [...elements,e])
        setMenuDispo(dispo)
    }

    const delElementToCarte = (e) => {
        const carte = elements 

        carte.splice(carte.indexOf(e), 1)
        setElementsDispo(elements => [...elements,e])
        setElements(carte)
    }

    const delMenuToCarte = (e) => {
        const carte = menus

        carte.splice(carte.indexOf(e), 1)
        setMenuDispo(elements => [...elements,e])
        setMenus(carte)
    }



    const [fieldValidationErrors,setFieldValidationErrors] = useState({
        message:'',
        error:false})

    const updateBD = async () => {
        const url = 'http://localhost:3001/carte'
        try {
            await fetchWrapper.post(url,{elements,menus, idRestaurant})
            setFin(true)
        }
        catch(err)
        {
            setFieldValidationErrors({message : err, error:true})
        }

    }

    useEffect(()=>
    {
        async function updateFromDb() {
            const e = await fetchWrapper.get(`http://localhost:3001/element/ByRestaurant/${idRestaurant}`)
            const m = await fetchWrapper.get(`http://localhost:3001/menu/ByRestaurant/${idRestaurant}`)
            setElementsDispo(e)
            setMenuDispo(m)
        }
        updateFromDb()
    },[])

    return (
        <div>
            {(fin) ?
            <div>
                <h3>Carte ajouté !!!</h3>
            </div>
            :
            <div id='AjouterunCarteForm'>
               <div id='dispoDiv'>
                    <h1>Disponible</h1>
                    <div id='menuDispo'>
                        <h2>Eléments disponibles : </h2><br/>
                        <table className='tableItem'>
                            <thead>
                                <tr className='cartetableau'>
                                    <th>Nom d</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Prix HT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                (elementsDispo) &&
                                elementsDispo.map((element) =>                        
                                <tr key={element._id}>
                                    <td >{element.nom}</td>
                                    <td >{element.description}</td>
                                    <td >{element.categorie}</td>
                                    <td >{element.prix_HT}</td>
                                    <td ><button onClick={() =>addElementToCarte(element)}>➕</button></td>
                                </tr> )

                                }
                            </tbody>
                        </table>
                    </div>
                    <div id='elementDispo'>
                    <div id='menuDispo'>
                        <h2>Menus disponibles : </h2><br/>
                            <table className='tableItem'>
                                <thead>
                                    <tr className='cartetableau'>
                                        <th>Nom du menu</th>
                                        <th>Prix HT</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                    (menuDispo) &&
                                    menuDispo.map((menu) =>                        
                                    <tr key={menu._id}>
                                        <td >{menu.nom}</td>
                                        <td >{menu.prix_HT.toFixed(2)}</td>
                                        <td ><button onClick={() =>addMenuToCarte(menu)}>➕</button></td>
                                    </tr> )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
               <div id='carteDiv'>
                    <h1>Sur la carte</h1>
                    <div id='menuCarte'>
                        <h2>Eléments : </h2><br/>
                        <table className='tableItem'>
                            <thead>
                                <tr className='cartetableau'>
                                    <th>Nom de l'élément</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Prix HT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                (elements) &&
                                elements.map((element) =>                        
                                <tr key={element._id}>
                                    <td >{element.nom}</td>
                                    <td >{element.description}</td>
                                    <td >{element.categorie}</td>
                                    <td >{element.prix_HT.toFixed(2)}</td>
                                    <td ><button onClick={() =>delElementToCarte(element)}>➖</button></td>
                                </tr> )

                                }
                            </tbody>
                        </table>
                    </div>
                    <div id='elementCarte'>
                    <div id='menuCarte'>
                        <h2>Menus : </h2><br/>
                            <table className='tableItem'>
                                <thead>
                                    <tr className='cartetableau'>
                                        <th>Nom du menu</th>
                                        <th>Prix HT</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                    (menus) &&
                                    menus.map((m) =>                        
                                    <tr key={m._id}>
                                        <td >{m.nom}</td>
                                        <td >{m.prix_HT}</td>
                                        <td ><button onClick={() =>delMenuToCarte(m)}>➖</button></td>
                                    </tr> )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {(fieldValidationErrors.error) && 
                        <div className='error'>
                        <label >{fieldValidationErrors.message}</label>
                    </div>}
               </div>
               <button onClick={updateBD}> Enregistrer </button>
            </div>
        }
        </div>
        );
}

export default AjouterUneCarte;
