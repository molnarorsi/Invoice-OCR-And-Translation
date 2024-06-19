import React, { useState, useEffect } from "react";
import { Paper, TextField, Grid } from "@mui/material";
import { useStyles } from "./styles";

const InvoiceTable = ({ data, setData }) => {
  const classes = useStyles();
  const [editableData, setEditableData] = useState({ ...data });

  useEffect(() => {
    setEditableData({ ...data });
  }, [data]);

  const handleFieldChange = (fieldName, value) => {
    const updatedData = {
      ...editableData,
      [fieldName]: value,
    };
    setEditableData(updatedData);
    setData(updatedData);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 5 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="Invoice number"
            value={editableData?.invoice_number || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("invoice_number", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Invoice CIF"
            value={editableData?.invoice_CIF || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("invoice_CIF", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Bank"
            value={editableData?.bank || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("bank", e.target.value)}
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="IBAN"
            value={editableData?.IBAN || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("IBAN", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Date of issue"
            value={editableData?.date_of_issue || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("date_of_issue", e.target.value)}
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="Due date"
            value={editableData?.due_date || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("due_date", e.target.value)}
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="Total amount"
            value={editableData?.total_price + " RON" || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("total_price", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Buyer CIF"
            value={editableData?.buyer_CIF || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("buyer_CIF", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Buyer Name"
            value={editableData?.buyer_name || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("buyer_name", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Buyer Address"
            value={editableData?.buyer_address || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("buyer_address", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Buyer City"
            value={editableData?.buyer_city || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("buyer_city", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Buyer TVA"
            value={editableData?.buyer_TVA || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("buyer_TVA", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Supplier CIF"
            value={editableData?.supplier_CIF || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("supplier_CIF", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Supplier Name"
            value={editableData?.supplier_name || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("supplier_name", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Supplier Address"
            value={editableData?.supplier_address || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("supplier_address", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Supplier City"
            value={editableData?.supplier_city || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("supplier_city", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Supplier TVA"
            value={editableData?.supplier_TVA || ""}
            variant="standard"
            fullWidth
            onChange={(e) => handleFieldChange("supplier_TVA", e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InvoiceTable;
