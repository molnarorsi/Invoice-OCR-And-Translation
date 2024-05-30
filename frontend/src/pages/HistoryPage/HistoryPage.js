import AppLayout from "../../components/AppLayout/AppLayout";
import InvoiceCard from "../../components/InvoiceCard/InvoiceCard";
import {useEffect, useState} from "react";
import httpRequest from "../../httpRequest";
import {Grid} from "@mui/material";
import { useStyles } from "./styles";

const HistoryPage = () => {
  const classes = useStyles();
  const [invoiceNumbers, setInvoiceNumbers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpRequest.get("http://localhost:5000/get-invoice-data");
        console.log(response.data.text);
        setInvoiceNumbers(response.data.invoice_numbers);
      } catch (error) {
        console.error(error);
      }
    }
    )();
  }
  , []);

  return (
      <AppLayout>
        <Grid container sx={{m : 0, mt: 5}}>
          {invoiceNumbers &&
            invoiceNumbers.map((invoiceNumber) => (
              <Grid key={invoiceNumber} item md={2}>
                <InvoiceCard data={invoiceNumber} />
              </Grid>
            ))}
        </Grid>
      </AppLayout>
  );
};

export default HistoryPage;