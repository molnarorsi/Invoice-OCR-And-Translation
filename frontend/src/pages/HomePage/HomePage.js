import { useContext, useEffect, useState } from "react";
import OCRContext from "../../context/ocr-context";
import AppLayout from "../../components/AppLayout/AppLayout";
import Tabbar from "../../components/Tabbar/Tabbar";
import UploadCard from "../../components/UploadCard/UploadCard";
import { useStyles } from "./styles";
import PreprocessingCard from "../../components/PreprocessingCard/PreprocessingCard";
import OCRCard from "../../components/OCRCard/OCRCard";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import httpRequest from "../../httpRequest";
import userContext from "../../context/user-context";

const HomePage = () => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext);
  const userCtx = useContext(userContext);
  const [activePage, setActivePage] = useState(0);
  const [userName, setUserName] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpRequest.get("http://localhost:5000/@");
        console.log(resp.data.name);
        setUserName(resp.data.name);
        userCtx.setUserName(resp.data.name);
        userCtx.setEmail(resp.data.email);
        userCtx.setRole(resp.data.role);
      } catch (error) {
        alert("Not authenticated! Please login.");
        window.location.href = "/login";
      }
    })();
  }, [userCtx]);

  

  useEffect(() => {
    setActivePage(ocrCtx.activePage);
    
  }, [ocrCtx]);

  return (
    <>
      <AppLayout userName={userName}>
        <Tabbar />
        <div className={classes.content}>
          {activePage === 0 && <UploadCard />}
          {activePage === 1 && <PreprocessingCard />}
          {activePage === 2 && <OCRCard />}
          {activePage === 3 && <SummaryCard />}
          <canvas className={classes.invoice} id="output" />
        </div>
      </AppLayout>
    </>
  );
};

export default HomePage;