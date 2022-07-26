import React, { useEffect, useState} from 'react';
import logo from '../../assets/logo.png'
import { fetchWrapper } from '../../lib/useGestDB';
import './AjoutRestaurant.css'

function AjoutRestaurant() {
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [cp, setCP] = useState("")
  const [ville, setVille] = useState("")  
  const [nbTable, setNbTable] = useState(0) 
  const [idRestaurateur] = useState(localStorage.getItem('userId')) 
  const [selectedFile,setSelectedFile]=useState(null)
  const [previewSrc,setPreviewSrc]=useState(null)
  const [fieldValidationErrors,setFieldValidationErrors] = useState({
    message:'',
    error:false})


useEffect(()=> {
    if(selectedFile) setPreviewSrc(URL.createObjectURL(selectedFile))
},[selectedFile])

async function setRestaurant (){
  console.log(idRestaurateur)
    
  try {
    const url = 'http://localhost:3001/restaurant'
    const res  =  await fetchWrapper.post(url,{nom, adresse, cp, ville, nbTable, idRestaurateur})

    const formData = new FormData()
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name);

    await fetchWrapper.upload(`${url}/uploadPicture/${res._id}`, formData);  
    setNom("")
    setAdresse("")
    setCP("")
    setVille("")
    setNbTable(0)   
    setSelectedFile()
    setPreviewSrc()
    setFieldValidationErrors({message : '', error:false})
  }
  catch(err)
  {
    setFieldValidationErrors({message : err, error:true})
  }
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
              <label><b>Nombre de tables : </b></label>
              <input type="number" placeholder="nbTable" onChange={(e) => {if(e.currentTarget.value>0) setNbTable(e.currentTarget.value)}} name='nbTable'value={nbTable} required/>
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}   />
              <div className='imgPreview'>
                {(previewSrc) && <img src={previewSrc} alt='Apercu' />}
              </div>
            </div>
            <div className='formulairebutton'>
              <input type="submit"  name="myFile" onClick={setRestaurant} />
            </div>
            {(fieldValidationErrors.error) && 
            <div className='error'>
              <label >{fieldValidationErrors.message}</label>
            </div>}
        </div>
    </div>
    );
  }

export default AjoutRestaurant;