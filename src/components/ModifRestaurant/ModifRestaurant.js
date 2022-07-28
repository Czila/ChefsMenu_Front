import React, { useEffect, useState } from 'react';
import './ModifRestaurant.css'
import logo from '../../assets/restaurant.png'
import { fetchWrapper } from '../../lib/useGestDB';

function ModifRestaurant() {
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
    const [fin,SetFin]=useState(false)
  
useEffect(()=> {
      if(selectedFile) setPreviewSrc(URL.createObjectURL(selectedFile))
},[selectedFile])
  
async function setRestaurant (){
      
    try {
      const url = 'http://localhost:3001/restaurant'
      const res  =  await fetchWrapper.post(url,{nom, adresse, cp, ville, nbTable, idRestaurateur})
  
      const formData = new FormData()
      formData.append(
        "myFile",
        selectedFile,
        selectedFile.name);
  
      await fetchWrapper.upload(`${url}/uploadPicture/${res._id}`, formData);  
      SetFin(true)
    }
    catch(err)
    {
      setFieldValidationErrors({message : err, error:true})
    }
}
return (
    <div>
      {(fin) ? 
      <div>
        Restaurant modifié !!
      </div>
      :
      <div id='ModifierRestaurantForm'>
          <div>
            <img src={restaurant} alt="Logo" className='logo' />
          </div>
          <div>
              <div className='formulairemodifresto'>
                <label className='ARtitre'><h3><b>Modifier votre Restaurant</b></h3></label><br/><br/>
                <label><b>Nom</b></label><br/>
                <input className='input' type="string" placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/><br/><br/>
                <label><b>Adresse</b></label><br/>
                <input className='input' type="string" placeholder="adresse" name="adresse" onChange={(e) => setAdresse(e.currentTarget.value)} value={adresse} required/><br/><br/>
                <label><b>CP</b></label><br/>
                <input className='input' type="string" placeholder="CP" name="CP" onChange={(e) => setCP(e.currentTarget.value)} value={cp} required/><br/><br/>
                <label><b>Ville</b></label><br/>
                <input className='input' type="string" placeholder="ville" name="ville" onChange={(e) => setVille(e.currentTarget.value)} value={ville}/><br/><br/>
                <label><b>Nombre de tables : </b></label><br/>
                <input className='input' type="number" placeholder="nbTable" onChange={(e) => {if(e.currentTarget.value>0) setNbTable(e.currentTarget.value)}} name='nbTable'value={nbTable} required/><br/><br/>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}   />
                <div className='imgPreview'>
                  {(previewSrc) && <img src={previewSrc} alt='Apercu' />}
                </div>
              </div>
              <div className='formulairemodifbutton'>
                <button className='buttonstyle' onClick={setRestaurant}> </button>
              </div>
              {(fieldValidationErrors.error) && 
              <div className='error'>
                <label >{fieldValidationErrors.message}</label>
              </div>}
          </div>
      </div>
    }
    </div>
      );
}

export default ModifRestaurant;