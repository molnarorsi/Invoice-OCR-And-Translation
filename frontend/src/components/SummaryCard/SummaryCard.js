import { useContext, useState } from "react";
import OCRContext from "../../context/ocr-context";
import { TextField, Button, Paper } from "@mui/material";
import { useStyles } from "./styles";
import SellerTable from "./SellerTable/SellerTable";
import BuyerTable from "./BuyerTable/BuyerTable";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import httpRequest from "../../httpRequest";

const SummaryCard = () => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext);
  const [showText, setShowText] = useState(true);
  const [translatedText, setTranslatedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  
  const handleTranslate = async () => {
    if (!ocrCtx.textResult) return; // Handle case where there's no text

    try {
      const response = await httpRequest.post("http://localhost:5000/translate", {
        text: ocrCtx.textResult,
      });

      if (response.data && response.data.translatedText) {
        console.log("Translated Text:", response.data.translatedText);
        setTranslatedText(response.data.translatedText); 
        setShowTranslation(true);

      // if (response.data && response.data.translatedText) {
        
         ocrCtx.setTextResult(response.data.translatedText); // Update textResult
       }
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };

  return (
    <>
      <div className={classes.rootContainer}>
      <div className={classes.textContainer}>
          {showText && (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 5 }}>
          <TextField
            id="outlined-multiline-static"
            sx={{ backgroundColor: "white", borderRadius: "20px" }}
            label="Text from OCR"
            multiline
            fullWidth
            rows={20}
            variant={"standard"}
            defaultValue={ocrCtx.textResult}
          />
        </Paper>  
          )}

          <Button
            variant="contained"
            onClick={() => setShowText(!showText)}
            sx={{ margin: "5px", px: "10%" }}
          >
            {showText ? "HIDE TEXT" : "SHOW TEXT"}
          </Button>

         {showTranslation && (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 5, marginTop: 2 }}>
            <TextField
              id="outlined-multiline-static"
              sx={{ backgroundColor: "white", borderRadius: "20px" }}
              label="Translated Text"
              multiline
              fullWidth
              rows={20}
              variant={"standard"}
              value={translatedText}  // Display the translated text
            />
          </Paper>
        )} 

          <Button
            variant="contained"
            onClick={handleTranslate}
            sx={{ margin: "5px", px: "10%" }}
          >
            TRANSLATE
          </Button>
        </div>

        <div className={classes.tables}>
        <InvoiceTable />
          <div className={classes.tableContainer}>
            <SellerTable />
            <BuyerTable />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
