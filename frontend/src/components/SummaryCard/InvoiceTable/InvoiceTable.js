import { useStyles } from "./styles";
import DataTableExtend from "../../Table/DataTableExtend";

const InvoiceTable = () => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
        <DataTableExtend />
    </div>
  );
};

export default InvoiceTable;
