import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { useStyles } from "./styles";
import { useContext, useState } from "react";
//ocrcontext
import OCRContext from "../../context/ocr-context";
import httpRequest from "../../httpRequest";



const OCRCard = () => {
  const classes = useStyles();
  const ocrCtx = useContext(OCRContext);

  const[loading, setLoading] = useState(false);

  const saveTimeOther = async (invoice_id, time_other) => {
    try {
      const resp = await httpRequest.post("http://localhost:5000/save-time-other", {
        invoice_id: invoice_id,
        time_other: time_other,
      });
    } catch (error) {
      console.log("Error!");
    }
  };

  const handleOCRmethod = async (OCRmethod) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", ocrCtx.actualImage);
    if (ocrCtx.file.type === "application/pdf") {
      formData.append("pdf", ocrCtx.file);
    } else if (ocrCtx.file.type === "image/jpeg") {
      formData.append("image", ocrCtx.file);
    } else if (ocrCtx.file.type === "image/png") {
      formData.append("image", ocrCtx.file);
    } else {
      console.log("Error");
    }

    try {
      const startTime = performance.now();

      const resp = await httpRequest.post(
        `http://localhost:5000/${OCRmethod}`,
        formData,
      );

      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const time_other = duration - resp.data.time.recognition + resp.data.time.parsing;
      const time = resp["data"]["time"];
      time["other"] = time_other;
      ocrCtx.setTextResult(resp["data"]["text"]);
      ocrCtx.setExtractedData(resp["data"]["parsed_text"]);

      ocrCtx.setInvoiceId(resp["data"]["invoice_id"]);
      saveTimeOther(resp["data"]["invoice_id"], time_other);
    } catch (error) {
      console.log("Error");
    }
    setLoading(false);
    ocrCtx.setActivePage(3);
  };

  

  return (
    <>
      <div className={classes.rootContainer}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          Select OCR method
        </Typography>

        <Grid container spacing={2} sx={{ mt: "15px" }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => handleOCRmethod("tesseract")}
              sx={{ px: "10%" }}
              disabled={loading}
            >
              Tesseract
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => handleOCRmethod("doctr")}
              sx={{ px: "10%" }}
              disabled={loading}
            >
              DocTROCR
            </Button>
          </Grid>
        </Grid>
        {loading && (
          <Grid container justifyContent="center" sx={{ mt: "15px" }}>
            <CircularProgress />
          </Grid>
        )}
      </div>
    </>
  );
};

export default OCRCard;