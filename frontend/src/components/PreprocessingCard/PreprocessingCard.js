import { Button, Grid, IconButton, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useStyles } from "./styles";
import httpRequest from "../../httpRequest";
import { useContext } from "react";
import OCRContext from "../../context/ocr-context";
const cv = window.cv;

const PreprocessingCard = () => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext)


  const handlePreprocessingMethod = async (methodEndpoint) => {
    let formData = new FormData();
    formData.append("file", ocrCtx.actualImage);
    try {
      const resp = await httpRequest.post(
        `http://localhost:5000/${methodEndpoint}`,
        formData
      );
      let bytestring = resp["data"]["image"];
      let image = bytestring.split("'")[1];
      let img = new Image();
      img.onload = () => {
        const mat = cv.imread(img);
        cv.imshow("output", mat);
        mat.delete();
      };
      img.src = "data:image/jpeg;base64," + image;
      const base64Response = await fetch(`data:image/jpeg;base64,${image}`);
      const blob = await base64Response.blob();
      let file = new File([blob], resp["data"]["filename"], {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });

      ocrCtx.setActualImage(file);
    } catch (error) {
      console.log("Error");
    }
  };

  // const handleReset = () => {
  //   ocrCtx.setActualImage(ocrCtx.originalImage);
  //   const originalImage = ocrCtx.originalImage;
  //   if (originalImage) {
  //     const img = new Image();
  //     img.onload = () => {
  //       const mat = cv.imread(img);
  //       cv.imshow("output", mat);
  //       mat.delete();
  //     };
  //     img.src = URL.createObjectURL(originalImage);
  //   }
  // };

  return (
    <>
      <div className={classes.rootContainer}>
        <Typography variant="h4" sx={{pt: 2, fontFamily: "'Staatliches', sans-serif !important"}}>
          Select preprocessing method
        </Typography>
        {/* <IconButton className={classes.resetButton} onClick={handleReset}>
          <RestartAltIcon />
        </IconButton> */}
        <div className={classes.buttonGroup}>
          <Button className={classes.actionButton} onClick={() => handlePreprocessingMethod("grayscale")}>Grayscale</Button>
          <Button className={classes.actionButton} onClick={() => handlePreprocessingMethod("binarization")}>Binarization</Button>
          <Button className={classes.actionButton} onClick={() => handlePreprocessingMethod("noise_reduction")}>Noise Reduction</Button>
          <Button className={classes.actionButton} onClick={() => handlePreprocessingMethod("skew_correction")}>Skew Correction</Button>
        </div>
        <Button className={classes.actionButton} onClick={() => ocrCtx.setActivePage(2)} sx={{margin: "20px", px: "10%"}}>NEXT</Button>
      </div>
    </>
  );
};

export default PreprocessingCard;