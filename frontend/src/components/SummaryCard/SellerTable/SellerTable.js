import { useStyles } from "./styles";
import DataTableSeller from "../../Table/DataTableSeller";
import { useContext } from "react";
import OCRContext from "../../../context/ocr-context";

const SellerTable = () => {
  const classes = useStyles();
  const { extractedData } = useContext(OCRContext);
  //console.log(extractedData)

  const data = {
    name: extractedData ? extractedData.seller_name : "",
    address: extractedData ? extractedData.seller_address : "",
    city: extractedData ? extractedData.seller_city : "",
    CIF: extractedData ? extractedData.seller_cif : "",
    TVA: extractedData ? extractedData.seller_tva : "",
    VAT: extractedData ? extractedData.seller_vat : "",
  }

  console.log(data);
  
  return (
    <div className={classes.table}>
        <DataTableSeller seller_data = {data}/>
    </div>
  );
};

export default SellerTable;