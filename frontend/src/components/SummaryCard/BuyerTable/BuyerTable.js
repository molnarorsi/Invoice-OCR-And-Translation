import { useStyles } from "./styles";
import DataTable from "../../Table/DataTable";
import { useContext } from "react";
import OCRContext from "../../../context/ocr-context";

const BuyerTable = () => {
  const classes = useStyles();
  const { extractedData } = useContext(OCRContext);
  console.log(extractedData)

  return (
    <div className={classes.table} >
        <DataTable buyerData = {extractedData}/>
    </div>
  );
};

export default BuyerTable;