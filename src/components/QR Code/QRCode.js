import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import {fetchWrapper} from '../../lib/useGestDB'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ('./QRCode.css')

function NewQRCode() {
  const urlBase = "http://localhost:3001/restaurant/"
  const restaurant_id='62d96bb9d4455394b2a619c7'
  const [table,setTables]=useState([{}])

  async function updateTables() {
    const t=[]
    const R = await fetchWrapper.get(`http://localhost:3001/restaurant/${restaurant_id}`)
    console.log( R[0])
    for (let i =1 ; i< R[0].nbTable +1; i++)      
    {   
        t.push({numTable:i, QRText : urlBase+i})
    }
    setTables(t)       
}

const printQRCode =() => {
  const input = document.getElementById('QRCodelist');
 console.log(input)
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
},[restaurant_id]);   

  return (
    <div>
    <div id="QRCodelist" className="QRCodelist">

      {(table.map((t) =>  
        <div  >
          <h2>Table : {t.numTable}</h2>
          <QRCode size='250' className="QRCode" key={t.numTable} value={t.QRText} renderAs="svg" /> 
        </div>
      ))}
        
    </div>
    <input type="submit" onClick={printQRCode} />
    </div>
  );
}

export default NewQRCode;


