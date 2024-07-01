import { useContext, useState, useEffect } from "react";
import OCRContext from "../../context/ocr-context";
import { TextField, Button, Paper, Select, MenuItem, Grid, IconButton } from "@mui/material";
import { useStyles } from "./styles";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import httpRequest from "../../httpRequest";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import Chart from "../../components/Chart/Chart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar } from '@mui/material';

const SummaryCard = (props) => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext);
  const [editableData, setEditableData] = useState({});
  const [showText, setShowText] = useState(true);
  const [translatedText, setTranslatedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showChart, setShowChart] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Added state for snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Added state for snackbar message
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);


  console.log('props:', props.dataFromDB);

  useEffect(() => {
    setEditableData(props.dataFromDB ? props.dataFromDB : ocrCtx.extractedData);
  }, [props.dataFromDB, ocrCtx.extractedData]);

  const handleDataChange = (updatedData) => {
    setEditableData(updatedData);
    if (JSON.stringify(updatedData) !== JSON.stringify(props.dataFromDB)) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true); // Start loading
    try {
      const resp = await httpRequest.post(
        "http://localhost:5000/modify-invoice-data",
        { new_data: editableData }
      );
      console.log(resp);
      setDataChanged(false);
      setSnackbarMessage("Data saved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving data:", error);
      setSnackbarMessage("Invoice data can be modified only from Summary!");
      setOpenSnackbar(true);
    } finally {
      setIsSaving(false); // End loading
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  let pdfBase64;
  let imageBase64;

  if (Object.keys(props).length !== 0) {
    if (props.dataFromDB.file_pdf) {
      pdfBase64 = props.dataFromDB.file_pdf;
    } else if (props.dataFromDB.file_image) {
      imageBase64 = props.dataFromDB.file_image;
    }
  }

  console.log('pdfBase64:', pdfBase64);
  console.log('imageBase64:', imageBase64);

  const handleOpenChart = () => {
    setShowChart(true);
  };

  const handleCloseChart = () => {
    setShowChart(false);
  };
  
  const handleTranslate = async () => {
    if (!ocrCtx.textResult) return;
  
    setIsTranslating(true); // Start loading
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
    } finally {
      setIsTranslating(false); // End loading
    }
  };

  const handleOpenFile = () => {
    if (Object.keys(props).length === 0) {
      const fileURL = URL.createObjectURL(ocrCtx.file);
      window.open(fileURL, "_blank");
    }
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
        {showChart ? (
          <Chart handleCloseChart={handleCloseChart}  invoice_id={props.dataFromDB ? props.dataFromDB.id : ocrCtx.invoiceId}/>
          ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: "right", marginRight: 10 }}>
              <IconButton sx={{ padding: "10px" }} onClick={handleOpenChart}>
                <DonutSmallIcon sx={{color: '#ffa2b6'}} fontSize="large" />
              </IconButton>
              <IconButton sx={{ padding: "10px" }} onClick={handleOpenFile}>
                <OpenInNewIcon sx={{color: '#ffa2b6'}} fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  className={classes.actionButton}
                  variant="text"
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
                      value={translatedText}
                    />
                  </Paper>
                )}
                <Select value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <MenuItem value={'en'}>English</MenuItem>
                  <MenuItem value={'fr'}>French</MenuItem>
                  <MenuItem value={'de'}>German</MenuItem>
                  <MenuItem value={'ro'}>Romanian</MenuItem>
                  <MenuItem value={'hu'}>Hungarian</MenuItem>
                </Select>
                <Button
                className={classes.actionButton}
                variant="text"
                onClick={handleTranslate}
                sx={{ margin: "5px", px: "10%" }}
                disabled={isTranslating} // Disable the button when isTranslating is true
              >
                {isTranslating ? <CircularProgress size={24} /> : "TRANSLATE"}
              </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.tables}>
                <InvoiceTable className={classes.tableContainer} data={editableData} setData={handleDataChange} />
              </div>
              {dataChanged && (
                <Button
                className={classes.actionButton}
                variant="text"
                onClick={handleSave}
                sx={{ margin: "5px", px: "10%" }}
                disabled={isSaving} // Disable the button when isSaving is true
              >
                {isSaving ? <CircularProgress size={24} /> : "SAVE"}
              </Button>
              )}
            </Grid>
          </Grid>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default SummaryCard;
