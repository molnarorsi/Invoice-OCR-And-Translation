import { useContext, useState } from "react";
import OCRContext from "../../context/ocr-context";
import { TextField, Button, Paper, Select, MenuItem } from "@mui/material";
import { useStyles } from "./styles";
import SellerTable from "./SellerTable/SellerTable";
import BuyerTable from "./BuyerTable/BuyerTable";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import httpRequest from "../../httpRequest";

const SummaryCard = (props) => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext);
  const [showText, setShowText] = useState(true);
  const [translatedText, setTranslatedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [language, setLanguage] = useState('en');

  let pdfBase64;
  let imageBase64;
  if (Object.keys(props).length !== 0) {
    if (props.dataFromDB.pdf_file) {
      pdfBase64 = props.dataFromDB.pdf_file;
    } else if (props.dataFromDB.image_file) {
      imageBase64 = props.dataFromDB.image_file;
    }
  }
  
  const handleTranslate = async () => {
    if (!ocrCtx.textResult) return; // Handle case where there's no text

    try {
      const response = await httpRequest.post("http://localhost:5000/translate", {
        text: ocrCtx.textResult,
        lang: language,
      });

      if (response.data && response.data.translatedText) {
        console.log("Translated Text:", response.data.translatedText);
        setTranslatedText(response.data.translatedText); 
        setShowTranslation(true);

        const parseResponse = await httpRequest.post("http://localhost:5000/parse-ocr", {
          text: response.data.translatedText
        });

        if (parseResponse.data) {
          console.log("Extracted data:", parseResponse.data.parsedText);
          ocrCtx.setExtractedData(parseResponse.data.parsedText);
        }
         
       }
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };

  const handleOpenFile = () => {
    console.log(props.dataFromDB);
    if (pdfBase64) {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const dataUrl = URL.createObjectURL(blob);
      window.open(dataUrl, "_blank");
    } else if (imageBase64) {
      const byteCharacters = atob(imageBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
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

          {Object.keys(props).length !== 0 && (
            <Button
              variant="contained"
              onClick={handleOpenFile}
              sx={{ margin: "5px", px: "10%" }}
            >
              OPEN FILE
            </Button>
          )}

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
        <Select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'fr'}>French</MenuItem>
          <MenuItem value={'de'}>German</MenuItem>
          <MenuItem value={'ro'}>Romanian</MenuItem>
          <MenuItem value={'hu'}>Hungarian</MenuItem>
            // Add more languages as needed
        </Select>
          <Button
            variant="contained"
            onClick={handleTranslate}
            sx={{ margin: "5px", px: "10%" }}
          >
            TRANSLATE
          </Button>
        </div>

        <div className={classes.tables}>
        <InvoiceTable data={props.dataFromDB ? props.dataFromDB : ocrCtx.extractedData}/>
          <div className={classes.tableContainer}>
          <SellerTable data={props.dataFromDB ? props.dataFromDB : ocrCtx.extractedData} />
            <BuyerTable data={props.dataFromDB ? props.dataFromDB : ocrCtx.extractedData}/>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
