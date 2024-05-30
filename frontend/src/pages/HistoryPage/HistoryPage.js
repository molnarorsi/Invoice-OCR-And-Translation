import AppLayout from "../../components/AppLayout/AppLayout";
import InvoiceCard from "../../components/InvoiceCard/InvoiceCard";
import {useEffect, useState} from "react";
import httpRequest from "../../httpRequest";
import {Grid} from "@mui/material";
import { useStyles } from "./styles";

const HistoryPage = () => {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpRequest.get("http://localhost:5000/get-invoice-data");
        console.log(response.data.text);
        setInvoices(response.data.text);
      } catch (error) {
        console.error(error);
      }
    }
    )();
  }
  , []);

  return (
    <>
      <AppLayout>
        <Grid container sx={{m : 0}}>
          <Grid item md={2}>
            {invoices && <InvoiceCard data={invoices} />}
          </Grid>
        </Grid>
      </AppLayout>
    </>
  );
};

export default HistoryPage;