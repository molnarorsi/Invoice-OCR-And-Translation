//import Navbar from "../../components/Navbar/Navbar";
//import SideMenu from "../../components/SideMenu/SideMenu";
import SelectCard from "../../components/SelectCard/SelectCard";

import { useStyles } from "./styles";

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        <SelectCard />
        <canvas className={classes.invoice} id="output" />
      </div>
    </>
  );
};