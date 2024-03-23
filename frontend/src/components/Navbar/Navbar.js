import Button from "@mui/material/Button";
import {useStyles} from "./styles"
import { Grid, Typography } from "@mui/material";
import httpRequest from "../../httpRequest";


const Navbar = (props) => {
    const classes = useStyles();

    const logoutUser = async () => {
        await httpRequest.post("//localhost:5000/logout");
    window.location.href = "/login";
      };

    return (
        <>
            <div className={classes.rootContainer}>
                <Grid container spacing={2} sx={{my: "auto"}}>
                    <Grid item xs={2}>
                    <Grid item xs={8} sx={{mt: 1, textAlign:"center"}}>
                            <Typography variant="h4">Welcome Back {props.userName}!!</Typography>
                        </Grid>
                    </Grid>
                        
                    <Grid item xs={2} sx={{mt: 1, textAlign: "right"}}>
                        <Button
                            className={classes.logout}
                            variant="contained"
                            sx={{mx: 2}}
                            onClick={logoutUser}
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