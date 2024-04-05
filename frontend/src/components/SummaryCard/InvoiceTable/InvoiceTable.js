import { useStyles } from "./styles";
import DataTableExtend from "../../Table/DataTableExtend";
import { useContext } from "react";
import OCRContext from "../../../context/ocr-context";

const InvoiceTable = () => {
  const classes = useStyles();
  const { extractedData } = useContext(OCRContext);
  console.log(extractedData)

  return (
    <div className={classes.table}>
        <DataTableExtend invoiceData={extractedData} />
    </div>
  );
};

export default InvoiceTable;
