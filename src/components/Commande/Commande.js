import {useState } from "react";
import {fetchWrapper} from '../../lib/useGestDB'
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

import ('./Commande.css');




function Commande(props) {
    const [commande,SetCommande] = useState(props.commande[0])
    let total =0;
    let totalTTC =0;

    const canvasAdd =() => {
        let add =''

        add =`<div>'Addition de la table '${commande.numTable} </div>`
        add +=`<div>'Addition de la table '${commande.numTable} </div>`

        return add
    }

    const printAddition =() => {
        const input = document.getElementById('commande');
        console.log(canvasAdd())
        html2canvas(canvasAdd)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.text(`Addition de la table ${commande.numTable} `,10,10)
            //pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save(`Addition${commande.numTable}.pdf`);
          })
      }

    const updateTotal = (m,t) =>
    {
        total=total+m
        totalTTC=totalTTC+(m*((t/100)+1))
    }

    const closeCommande =() =>
    {
        fetchWrapper.put(`http://localhost:3001/commande/${commande._id}`,{"etat":"Fini"})
        SetCommande({...commande,"etat":"Fini"})
    }
    console.log(commande)

    return ( <div>
        <h1 className="titreCommande">Commande de la table {commande.numTable}</h1>
        <div id="commande">
            
            {(commande.menus.length>0) &&
            <ul >
                <li className="titreCommandeLi liMenu">Menu : </li>

                <ul className="detailCommandeul">
                    {commande.menus.map((me) => 
                        <li key={me._id}>{me.nom}{updateTotal(me.prix_HT,me.tva)}</li>
                    )}
                </ul>
                 
            </ul>
            }
            {
            (commande.elements.length>0) &&
            <ul >
                <li className="titreCommandeLi liCarte">A la carte : </li>
                <ul className="detailCommandeul">
                    {commande.elements.map((el) => 
                        <li key={el._id}>{el.nom} {updateTotal(el.prix_HT,el.tva)}</li>
                    )}
                </ul>
            </ul>
            }
          </div>
          <div className="total">
            <div>
                <h3>Total HT</h3>
                <span>{total.toFixed(2)} €</span>
            </div>
            <div>
                <h3>Total TTC</h3>
                <span>{totalTTC.toFixed(2)} €</span>
            </div>
          </div>
          <div className="butCommande">
            <button onClick={printAddition}>🖨️ Imprimer l'addition</button>
            {(commande.etat==='enCours') && <button onClick={()=> closeCommande()}>✅ Terminer la commande</button>}
          </div>
    </div> );
}

export default Commande;