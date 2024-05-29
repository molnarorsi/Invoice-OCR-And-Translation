import { Link } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { useStyles } from "./styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import QuestionAnswerSharpIcon from '@mui/icons-material/QuestionAnswerSharp';
import logo from "../../assets/logocska.png"

const SideMenu = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.rootContainer}>
      <img src={logo} alt="Logo" className={classes.logo} />
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
                Your scans
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
          <br />
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;