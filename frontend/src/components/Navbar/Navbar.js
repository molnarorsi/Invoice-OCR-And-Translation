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
        <div className={classes.rootContainer}>
            <Typography className={classes.welcomeText}>Welcome Back {props.userName}!!</Typography>
            <Button
                className={classes.logoutButton}
                variant="contained"
                onClick={logoutUser}
                aria-label="Logout Button"
            >
                Log Out
            </Button>
        </div>
    );
};

export default Navbar;