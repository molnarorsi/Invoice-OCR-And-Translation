import Button from "@mui/material/Button";
import AuthContext from "../../context/authcontext";

import React, {useContext} from "react";
import {useStyles} from "./styles"
import { Grid, Typography } from "@mui/material";


const Navbar = () => {
    const context = useContext(AuthContext);
    const classes = useStyles();

    return (
        <>
            <div className={classes.rootContainer}>
                <Grid container spacing={2} sx={{my: "auto"}}>
                    <Grid item xs={10} sx={{mt: 1, textAlign: "center"}}>
                        <Typography variant="h4">Welcome!!</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{mt: 1, textAlign: "right"}}>
                        <Button
                            className={classes.logout}
                            variant="contained"
                            sx={{mx: 2, backgroundColor:"#00ABB3"}}
                            onClick={context.logout}
                        >
                            Log Out
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Navbar;