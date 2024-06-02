import {Paper, TextField} from "@mui/material";

function DataTableSeller({ seller_data }) {
    return (
        <Paper elevation={3} sx={{p:2, borderRadius: 5}}>
            <TextField label="Name" value={seller_data.name} sx={{mb: 1}} variant="standard" fullWidth/> 
            <TextField label="Address" value={seller_data.address} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="City" value={seller_data.city} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="CIF" value={seller_data.CIF} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="TVA" value={seller_data.TVA} sx={{mb: 1}} variant="standard" fullWidth/>  
            <TextField label="VAT" value={seller_data.VAT} sx={{mb: 1}} variant="standard" fullWidth/>         
        </Paper>
    );
}

export default DataTableSeller;