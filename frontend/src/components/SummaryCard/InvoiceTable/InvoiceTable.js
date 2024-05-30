import { useStyles } from "./styles";
import DataTableExtend from "../../Table/DataTableExtend";
import { useContext } from "react";
import OCRContext from "../../../context/ocr-context";

const InvoiceTable = (props) => {
  const classes = useStyles();
  const { extractedData } = useContext(OCRContext);
  console.log(extractedData)

  return (
    <div className={classes.table}>
        <DataTableExtend invoiceData={props.extractedData} />
    </div>
  );
};

export default InvoiceTable;
