import React from "react";
import { Paper, TextField, Grid } from "@mui/material";
import { useContext } from "react";
import OCRContext from "../../context/ocr-context";

const DataTableExtend = () => {
  const ocrCtx = useContext(OCRContext);
  console.log(ocrCtx.extractedData);
  const invoiceData = ocrCtx.extractedData;

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 5 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        <TextField
            label="Invoice number"
            defaultValue={invoiceData?.invoice_number || ""}
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            label="Invoice CIF"
            defaultValue={invoiceData?.invoice_id || ""}
            variant="standard"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
        <TextField
            label="Bank"
            defaultValue={invoiceData?.bank || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={6}>
        <TextField
            label="IBAN"
            defaultValue={invoiceData?.iban || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            label="Date of issue"
            defaultValue={invoiceData?.date_of_issue || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={6}>
        <TextField
            label="Due date"
            defaultValue={invoiceData?.due_date || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
        
        
        <Grid item xs={6}>
        <TextField
            label="Total amount"
            defaultValue={invoiceData?.total_price + " RON" || ""}
            variant="standard"
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DataTableExtend;