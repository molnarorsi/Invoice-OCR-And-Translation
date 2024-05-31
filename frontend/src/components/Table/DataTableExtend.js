import React from "react";
import { Paper, TextField, Grid } from "@mui/material";
import { useContext } from "react";
import OCRContext from "../../context/ocr-context";

const DataTableExtend = () => {
  const ocrCtx = useContext(OCRContext);
  console.log(ocrCtx.extractedData);
  const invoiceData = ocrCtx.extractedData;
  // console.log(Object.keys(invoiceData))
  // console.log("Rendering Bank field - data:", invoiceData?.bank)

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 5 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        <TextField
            label="Invoice number"
            value={invoiceData?.invoice_number || ""}
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            label="Invoice CIF"
            value={invoiceData?.invoice_CIF || ""}
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            label="Bank"
            value={invoiceData?.bank || ""}
            variant="standard"
            fullWidth
          />
          
        </Grid>
        
        <Grid item xs={6}>
        <TextField
            label="IBAN"
            value={invoiceData?.IBAN || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            label="Date of issue"
            value={invoiceData?.date_of_issue || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={6}>
        <TextField
            label="Due date"
            value={invoiceData?.due_date || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        
        
        <Grid item xs={6}>
        <TextField
            label="Total amount"
            value={invoiceData?.total_price + " RON" || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DataTableExtend;
