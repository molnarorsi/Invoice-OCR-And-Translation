import Button from "@mui/material/Button";
import {useStyles} from "./styles"
import { Typography, Grid, IconButton, MenuItem, Menu } from "@mui/material";
import httpRequest from "../../httpRequest";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import BusinessIcon from "@mui/icons-material/Business";
import QuestionAnswerSharpIcon from '@mui/icons-material/QuestionAnswerSharp';
import logo from "../../assets/logocska.png"
import {useContext, useState} from "react";
import userContext from "../../context/user-context";
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordModal from "../PasswordModal/PasswordModal";
import {useNavigate} from "react-router-dom";

const Navbar = (props) => {
    const classes = useStyles();

    const navigate = useNavigate();
    

    const user = useContext(userContext);
    const role = user.role;

    const [menuOpen, setMenuOpen] = useState(null);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const handleMenuOpen = (event) => {
        setMenuOpen(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuOpen(null);
    };

    const openProfile = () => {
      navigate('/profile');
    };

    const handlePassworOpen = () => {
        setOpenPasswordModal(true);
        setMenuOpen(null);
    };

    const handlePasswordClose = () => {
        setOpenPasswordModal(false);
    };

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
            <div>
              <Link to="/data-visualization" className={classes.link}>
                <Typography variant="h7" >
                  <BusinessIcon />
                  Data Visualization
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
          <Grid item xs={3} sx={{mt: 1, textAlign: "center"}}>
            <IconButton sx={{p:0.1, color:"white"}} onClick={handleMenuOpen}>
              <AccountCircleIcon fontSize="large"/>
            </IconButton>
            <Menu
              anchorEl={menuOpen}
              open={Boolean(menuOpen)}
              onClose={handleMenuClose}
              >
                <MenuItem onClick={openProfile}>Profile</MenuItem>
                <MenuItem onClick={handlePassworOpen}>Change Password</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
          </Grid>
          <Button
            className={classes.logoutButton}
            variant="text"
            onClick={logoutUser}
            aria-label="Logout Button"
          >
            Log Out
          </Button>
          <PasswordModal open={openPasswordModal} onClose={handlePasswordClose} />
        </div>
      );
};

export default Navbar;