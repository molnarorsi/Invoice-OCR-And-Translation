import {Paper, TextField} from "@mui/material";

function DataTableBuyer({ buyerData }) {
    return (
        <Paper elevation={3} sx={{p:2, borderRadius: 5}}>
            <TextField label="Name" value={buyerData.name} sx={{mb: 1}} variant="standard" fullWidth/> 
            <TextField label="Address" value={buyerData.address} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="City" value={buyerData.city} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="CIF" value={buyerData.CIF} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="TVA" value={buyerData.TVA} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="VAT" value={buyerData.VAT} sx={{mb: 1}} variant="standard" fullWidth/>         
        </Paper>
    );
}

export default DataTableBuyer;