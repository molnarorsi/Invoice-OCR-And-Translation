import AppLayout from "../../components/AppLayout/AppLayout";
import InvoiceCard from "../../components/InvoiceCard/InvoiceCard";
import {useEffect, useState} from "react";
import httpRequest from "../../httpRequest";
import {Grid} from "@mui/material";
import { useStyles } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import GroupInvoiceTable from "../../components/GroupInvoiceTable/GroupInvoiceTable";

const HistoryPage = () => {
  const classes = useStyles();
  const [invoiceNumbers, setInvoiceNumbers] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await getInvoiceData();
    }
    )();
  }, []);
  
  const getInvoiceData = async () => {
    try {
      const response = await httpRequest.get("http://localhost:5000/get-invoices");
      console.log(response.data.invoices);
      setInvoiceNumbers(response.data.invoices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (invoiceData) => {
    console.log(invoiceData);
    setOpen(true);
    setSelectedInvoice(invoiceData);
  };

  return (
      <AppLayout>
        <Grid container sx={{m : 0, mt: 5}}>
          {!open && (
            <div className={classes.table}>
                <GroupInvoiceTable invoiceData={invoiceNumbers} openSummary={handleOpen} refreshData={getInvoiceData}/>
            </div>
          )}
        </Grid>
        {open && (
          <div>
            <IconButton onClick={() => setOpen(false)}>
              <ArrowBackIcon/>
            </IconButton>
            <SummaryCard dataFromDB = {selectedInvoice}/>
          </div>
        )}
      </AppLayout>
  );
};

export default HistoryPage;