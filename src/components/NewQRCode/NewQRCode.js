import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import {fetchWrapper} from '../../lib/useGestDB'
import {useParams} from 'react-router-dom';
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import './NewQRCode.css'


function NewQRCode() {
  const params = useParams();
  let idRestaurant =params.restaurantID
  const urlBase = `http://localhost:3000/restaurant/${idRestaurant}`
  const [table,setTables]=useState([{}])

  async function updateTables() {
    const t=[]
    const R = await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`)
    for (let i =1 ; i< R[0].nbTable +1; i++)      
    {   
        t.push({numTable:i, QRText : urlBase+i})
    }
    setTables(t)       
}

const printQRCode =() => {
  const input = document.getElementById('QRCodelist');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("qRcode.pdf");
    })
}
useEffect(() => {  
  updateTables()
},[idRestaurant]);   

  return (
    <div>
    
    <div id="conteneurqrcode">
    <button className="buttonstyle" id="buttonqrcode" onClick={printQRCode}> 🖨️ Imprimer mes QR Codes</button>
    <div id="QRCodelist" className="QRCodelist">
      {(table.map((t) =>  
        <div  >
          <h4 id="QRCodetitre" >Table {t.numTable}</h4>
          <QRCode size='250' className="QRCode" key={t.numTable} value={t.QRText} renderAs="svg" /> 
        </div>
      ))}
    </div>  
    </div>

    </div>
  );
}

export default NewQRCode;


