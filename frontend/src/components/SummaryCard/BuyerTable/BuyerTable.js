import { useStyles } from "./styles";
import DataTable from "../../Table/DataTableBuyer";
import { useContext } from "react";
import OCRContext from "../../../context/ocr-context";

const BuyerTable = () => {
  const classes = useStyles();
  const { extractedData } = useContext(OCRContext);
  //console.log(extractedData)

  const data = {
    name: extractedData ? extractedData.buyer_name : "",
    address: extractedData ? extractedData.buyer_address : "",
    city: extractedData ? extractedData.buyer_city : "",
    CIF: extractedData ? extractedData.buyer_cif : "",
    TVA: extractedData ? extractedData.buyer_tva : "",
    VAT: extractedData ? extractedData.buyer_vat : "",
  }

  console.log(data);
  return (
    <div className={classes.table} >
        <DataTable buyerData = {data}/>
    </div>
  );
};

export default BuyerTable;