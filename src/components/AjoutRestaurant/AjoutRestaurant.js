import React, { useState} from 'react';
import './AjoutRestaurant.css'
import logo from '../../assets/logo.png'
import { fetchWrapper } from '../../lib/useGestDB';

function AjoutRestaurant() {
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [cp, setCP] = useState("")
  const [ville, setVille] = useState("")  
  const [image, setImage] = useState("") 
  const [nbTable, setNbTable] = useState("") 
  const [idRestaurateur] = useState(localStorage.getItem('userId').replace(/"/g, '')) 
  const [erreur,setErreur]= useState(false)
  const [selectedFile,setSelectedFile]=useState(null)


function onFileChange(e) {
  setSelectedFile(e.target.files[0])
}

function VerifieRestaurant(){
  setRestaurant()
  if (nom!=="" && adresse!=="" && cp!=="" && ville!=="" && nbTable!=="" && idRestaurateur!==""){
      
  }
  else {setErreur(true)
  console.log(erreur)}
}

async function setRestaurant (){
    const url = 'http://localhost:3001/restaurant'
    //const res  =  await fetchWrapper.post(url,{nom, adresse, cp, ville, image, nbTable, idRestaurateur})
    await fetchWrapper.uploadImg(`http://localhost:3001/restaurant/uploadPicture/62debd1ee45f73b8dc478aa8`, selectedFile);
    /*if(res._id){
      
      setNom("")
      setAdresse("")
      setCP("")
      setVille("")
      setImage("")
      setNbTable("")
      setErreur(false)
    }
    else 
    {
      setErreur(true)
    }*/
}

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
              <label><b>nbTable</b></label>
              <input type="number" placeholder="nbTable" onChange={(e) => setNbTable(e.currentTarget.value)} name='nbTable'value={nbTable} required/>
              <input type="file" onChange={onFileChange}  />
            </div>
            <div className='formulairebutton'>
              <input type="submit" id='submit' name="myFile" onClick={VerifieRestaurant} />

            </div>
            {(erreur) && <label className='alert'>{"Les données sont vides"}</label>}
        </div>
    </div>

    );


  }

export default AjoutRestaurant;

// function Resto  {

//   state = {

//   // Initially, no file is selected
//   selectedFile: null
//   };

//   // On file select (from the pop up)
//   onFileChange = event => {

//   // Update the state
//   this.setState({ selectedFile: event.target.files[0] });

//   };

//   // On file upload (click the upload button)
//   onFileUpload = () => {

//   // Create an object of formData
//   const formData = new FormData();

//   // Update the formData object
//   formData.append(
//     "myFile",
//     this.state.selectedFile,
//     this.state.selectedFile.name
//   );

//   // Details of the uploaded file
//   console.log(this.state.selectedFile);

//   // Request made to the backend api
//   // Send formData object
//   axios.post("api/uploadfile", formData);
//   };

//   // File content to be displayed after
//   // file upload is complete
//   fileData = () => {

//   if (this.state.selectedFile) {

//     return (
//     <div>
//       <h2>File Details:</h2>

// <p>File Name: {this.state.selectedFile.name}</p>


// <p>File Type: {this.state.selectedFile.type}</p>


// <p>
//       Last Modified:{" "}
//       {this.state.selectedFile.lastModifiedDate.toDateString()}
//       </p>

//     </div>
//     );
//   } else {
//     return (
//     <div>
//       <br />
//       <h4>Choissisez une image de votre choix du restaurant </h4>
//     </div>
//     );
//   }
//   };

//   render() {

//   return (
//     <div>
//       <h1>
//       Télécharger votre image
//       </h1>
//       <div>
//         <input type="file" onChange={this.onFileChange} />
//         <button onClick={this.onFileUpload}>
//         Télécharger!
//         </button>
//       </div>
//     {this.fileData()}
//     </div>
//   );
//   }
// }




// export default AjoutRestaurant;