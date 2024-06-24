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
    try {
      const resp = await httpRequest.post(
        "http://localhost:5000/modify-invoice-data",
        { new_data: editableData }
      );
      console.log(resp);
      setDataChanged(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
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

  const handleDownloadFile = () => {
    if (Object.keys(props).length == 0) {
      const fileURL = URL.createObjectURL(ocrCtx.file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "file." + ocrCtx.file.type.split("/")[1]; 
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 100);
    }
    if (pdfBase64) {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "file.pdf";
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } else if (imageBase64) {
      const byteCharacters = atob(imageBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "file.png";
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
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
                <DonutSmallIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ padding: "10px" }} onClick={handleDownloadFile}>
                <DownloadIcon fontSize="large" />
              </IconButton>
              <IconButton sx={{ padding: "10px" }} onClick={handleOpenFile}>
                <OpenInNewIcon fontSize="large" />
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
                >
                  TRANSLATE
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
                >
                  SAVE
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default SummaryCard;
