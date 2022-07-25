import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

import { Button } from "react-bootstrap";

import "./styles.css";



const idRestaurant='62d96bb9d4455394b2a619c7'
  let data = [  
    { id: _id, url: `http://localhost:3001/${idRestaurant}/table${_id}` }
  ];
  
class QRCode extends React.Component {
  print(row, e) {
    const qrCodeCanvas = document.querySelectorAll(
      "[data-qr='" + row.url + "']"
    )[0];
    const qrCodeDataUri = qrCodeCanvas.toDataURL("image/png");

    var doc = new jsPDF("p", "pt", "c6");
    doc.setFontSize(22);
    doc.text(20, 80, "Table: " + row.id);
    doc.addImage(qrCodeDataUri, "JPEG", 100, 100, 50, 50);

    doc.save("QrCode-" + row.name + "-" + row.surname + ".pdf");
  }

  render() {
    const columns = [
      {
        name: "Table",
        selector: "id",
        sortable: true
      },
      {
        name: "Qr code",
        selector: "qrcode",
        ignoreRowClick: true,
        cell: (row) =>
          row.url ? <QRCode data-qr={row.url} value={row.url} /> : ""
      },
      {
        name: "Print",
        selector: "Print",
        ignoreRowClick: true,
        cell: (row) => (
          <Button onClick={(e) => this.print(row, e)}>
            Imprimer mon QR code
          </Button>
        )
      }
    ];
    return (
      <div className="QRCode">
        <DataTable url="QRCode des tables" columns={columns} data={data} />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<QRCode />, rootElement);




