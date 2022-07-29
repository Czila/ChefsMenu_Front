import {useState } from "react";
import {fetchWrapper} from '../../lib/useGestDB'
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import ('./Commande.css');




function Commande(props) {
    const [commande,SetCommande] = useState(props.commande[0])
    let total =0;
    let totalTTC =0;

    const printAddition =() => {
        let input = document.getElementById('ForPrint');
        input.removeAttribute("hidden");
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.autoPrint();
            pdf.output('dataurlnewwindow');
            pdf.save(`Addition${commande.numTable}.pdf`);
          })
          input.setAttribute("hidden",true);
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
    return ( <div>
    <div>
        <h1 className="titreCommande">Commande de la table {commande.numTable}</h1>
        <div id="commande">
            
            {(commande.menus.length>0) &&
            <ul >
                <li className="titreCommandeLi liMenu">Menu : </li>

                <ul className="detailCommandeul">
                    {commande.menus.map((me) => 
                        <li key={me._id}>{me.nom}{updateTotal(me.prix_HT,5.5)}</li>
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
    </div>

    <div id="ForPrint" hidden>
    <h1 className="titreCommandePrt">Addition de la table {commande.numTable}</h1>
        <div id="commandePrt">
        <hr/>
            {(commande.menus.length>0) &&
            <ul >
                <ul className="detailCommandeulPrt">
                    {commande.menus.map((me) => 
                        <li key={me._id}>{me.nom} - {me.prix_HT} - {'5,5'} % {(me.prix_HT * (1+(5.5/100))).toFixed(2) }€ TTC </li>
                    )}
                </ul>
                 
            </ul>
            }
            {
            (commande.elements.length>0) &&
            <ul >
                <ul className="detailCommandeulPrt">
                    {commande.elements.map((el) => 
                        <li key={el._id}>{el.nom} {el.prix_HT.toFixed(2)} € {el.tva.toFixed(2)} % {(el.prix_HT * (1+(el.tva/100))).toFixed(2) }€ TTC </li>
                    )}
                </ul>
            </ul>
            }
          </div>
          <hr/>
          <div className="totalPrt">
            <div>
                <h3>Total HT</h3>
                <span>{total.toFixed(2)} €</span>
            </div>
            <div>
                <h3>Total TTC</h3>
                <span>{totalTTC.toFixed(2)} €</span>
            </div>

          
          </div>
          <div>
          <hr/>
                Merci pour votre visite ❤️❤️❤️❤️❤️
            </div>
    </div>

    </div> );
}

export default Commande;