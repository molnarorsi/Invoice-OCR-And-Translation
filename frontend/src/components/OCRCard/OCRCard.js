import { Button, Typography } from "@mui/material";
import { useStyles } from "./styles";
import { useContext } from "react";
//ocrcontext
import OCRContext from "../../context/ocr-context";
const cv = window.cv;

const OCRCard = () => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext)

  return (
    <>
      <div className={classes.rootContainer}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          Select OCR method
        </Typography>

        <Button
          variant="contained"
          onClick={() => ocrCtx.setActivePage(3)}
          sx={{ margin: "20px", px: "10%" }}
        >
          NEXT
        </Button>
      </div>
    </>
  );
};

export default OCRCard;