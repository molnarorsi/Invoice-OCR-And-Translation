// import SideMenu from "../SideMenu/SideMenu";
import Navbar from "../Navbar/Navbar";
import { useStyles } from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import image from "../../assets/invoice.png";
import leftImage from "../../assets/data.png";

const AppLayout = (props) => {
  const classes = useStyles();

  const notify = () => {
    toast.info("Need help? Click here!", {
      className: 'customToast',
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClick: () => window.location.href = "/chatpdf"
    });
  };

  useEffect(() => {
    notify();
  }, []);

  return (
    <div className={classes.pageWrapper}>
      <ToastContainer />
      {/* <SideMenu/> */}
      <div className={classes.contentWrapper}>
        <Navbar userName={props.userName}/>
        {props.children}
        {/* <img src={image} className={classes.backgroundImage} alt="description" />
        <img src={leftImage} className={classes.leftBackgroundImage} alt="data" /> */}
      </div>
    </div>
  );
};

export default AppLayout;