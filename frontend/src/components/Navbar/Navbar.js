import Button from "@mui/material/Button";
import {useStyles} from "./styles"
import { Typography } from "@mui/material";
import httpRequest from "../../httpRequest";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import BusinessIcon from "@mui/icons-material/Business";
import QuestionAnswerSharpIcon from '@mui/icons-material/QuestionAnswerSharp';
import logo from "../../assets/logocska.png"
import {useContext} from "react";
import userContext from "../../context/user-context";
import PeopleIcon from '@mui/icons-material/People';

const Navbar = (props) => {
    const classes = useStyles();
    const user = useContext(userContext);
    const role = user.role;

    const logoutUser = async () => {
        await httpRequest.post("//localhost:5000/logout");
        window.location.href = "/login";
    };

    return (
        <div className={classes.rootContainer}>
          <Typography className={classes.welcomeText}>Welcome Back {props.userName}!!</Typography>
          <Divider />
          <div className={classes.linkContainer}>
            <div>
              <Link to="/" className={classes.link}>
                <Typography variant="h7">
                  <DashboardIcon />
                  Dashboard
                </Typography>
              </Link>
            </div>
            <div>
              <Link to="/history" className={classes.link}>
                <Typography variant="h7" >
                  <HistoryIcon />
                  Invoice History
                </Typography>
              </Link>
            </div>
            <div>
              <Link to="/chatpdf" className={classes.link}>
                <Typography variant="h7" >
                  <QuestionAnswerSharpIcon />
                  Chat PDF
                </Typography>
              </Link>
            </div>
            <div>
              <Link to="/groups" className={classes.link}>
                <Typography variant="h7" >
                  <BusinessIcon />
                  Groups
                </Typography>
              </Link>
            </div>
          </div>
          {role == "admin" && (
            <div>
              <Link to="/users" className={classes.link}>
                <Typography variant="h7">
                  <PeopleIcon />
                  Manage users
                </Typography>
              </Link>
            </div>
          )}
          <Button
            className={classes.logoutButton}
            variant="text"
            onClick={logoutUser}
            aria-label="Logout Button"
          >
            Log Out
          </Button>
        </div>
      );
};

export default Navbar;