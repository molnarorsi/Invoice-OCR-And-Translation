import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootContainer: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    overflow: "auto",
    '@media (max-width: 1200px)': {
      padding: "10px",
    },
    '@media (max-width: 800px)': {
      padding: "5px",
    },
    paddingLeft: "250px"
  },
  textContainer: {
    margin: "10px",
    width: "100%",
    maxWidth: "500px", // Set maximum width for textContainer
    textAlign: "center",
    overflow: "auto",
  },
  tables: {
    margin: "10px",
    width: "100%",
    maxWidth: "500px", // Set maximum width for tables
    overflow: "auto",
  },
  tableContainer: {
    display: "flex",
    marginBottom: 10,
    width: "100%",
    overflow: "auto",
  },
  actionButton: {
    fontFamily: "'Staatliches', sans-serif !important",
    color: "#efb11d !important",
    backgroundColor: "transparent",
    border: "2px solid #efb11d !important",
    borderRadius: "50px !important",
    '&:hover': {
      backgroundColor: "#efb11d",
      color: "#d6536d !important",
    },
    padding: "5px 10px",
  },
});
