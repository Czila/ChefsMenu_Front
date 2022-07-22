import React, { useState, useRef, Component} from 'react';
import axios from 'axios';
import './AjoutRestaurant.css'
import logo from '../../assets/logo.png'

function AjoutRestaurant() {
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [cp, setCP] = useState("")
  const [ville, setVille] = useState("")  
  const [image, setImage] = useState("") 
  const [horaire, setHoraire] = useState("") 
  const [nbTable, setNbTable] = useState("") 
  const [idRestaurateur, setIdRestaurateur] = useState("") 
  const [erreur,setErreur]= useState(false)

function VerifieRestaurant(){
  if (nom!=="" && adresse!=="" && cp!=="" && ville!=="" && image!=="" && horaire!=="" && nbTable!=="" && idRestaurateur!==""){
      setRestaurant()
  }
  else {setErreur(true)
  console.log(erreur)}
}

async function setRestaurant (){

    console.log (nom, adresse, cp, ville, image, horaire, nbTable, idRestaurateur)
   const url = 'http://localhost:3001/restaurant'
   const res = await fetch(url, {
       method: "post",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({nom, adresse, cp, ville, image, horaire, nbTable, idRestaurateur})
   })
   
   console.log(res)
   
   
}

// return (

//     <div className="img">

    

//         <input

//           type="text"

//           value={name}

//           onChange={(e) => setName(e.target.value)}

//         />


//         <FileUploaded

//           onFileSelectSuccess={(file) => setSelectedFile(file)}

//           onFileSelectError={({ error }) => alert(error)}

//         />


//         <button onClick={submitForm}>Submit</button>

return (
    <div id='AjouterRestaurantForm'>
        <div>
          <img src={logo} alt="Logo" className='logo' />
        </div>
        <div className='formulaire'>
            <div className='formulaireresto'>
                
              <label><b>Ajoutez votre Restaurant</b></label>
              <label><b>Nom</b></label>
              <input type="string" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
              <label><b>Adresse</b></label>
              <input type="string" placeholder="adresse" name="adresse" onChange={(e) => setAdresse(e.currentTarget.value)} value={adresse} required/>
              <label><b>CP</b></label>
              <input type="string" placeholder="CP" name="CP" onChange={(e) => setCP(e.currentTarget.value)} value={cp} required/>
              <label><b>Ville</b></label>
              <input type="string" placeholder="ville" name="ville" onChange={(e) => setVille(e.currentTarget.value)} value={ville}/>
              {/* <label><b>Image</b></label>
              <input

          type="text"

          value={name}

          onChange={(e) => setName(e.target.value)}

        />


        <FileUploaded

          onFileSelectSuccess={(file) => setSelectedFile(file)}

          onFileSelectError={({ error }) => alert(error)}

        />

        

        <button onClick={submitForm}>Submit</button>
              <input type="string" placeholder="image" onChange={(e) => setImage(e.currentTarget.value)} name='image'value={image} required/>  */}
              <label><b>Horaire</b></label>
              <input type="Date" placeholder="horaire" onChange={(e) => setHoraire(e.currentTarget.value)} name='horaire'value={horaire} required/>
              <label><b>nbTable</b></label>
              <input type="number" placeholder="nbTable" onChange={(e) => setNbTable(e.currentTarget.value)} name='nbTable'value={nbTable} required/>
              <label><b>idRestaurateur</b></label>
              <input type="string" placeholder="idRestaurateur" onChange={(e) => setIdRestaurateur(e.currentTarget.value)} name='idRestaurateur'value={idRestaurateur} required/>
            </div>
            <div className='formulairebutton'>
              <input type="submit" id='submit' onClick={VerifieRestaurant} />

            </div>
            {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
        </div>

    </div>

    );


  }
export default AjoutRestaurant;