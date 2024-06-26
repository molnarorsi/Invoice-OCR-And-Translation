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
      paddingLeft: "10px", // Adjust padding for smaller screens
    },
    paddingLeft: "250px"
  },
  textContainer: {
    margin: "10px",
    width: "100%",
    maxWidth: "500px", // Set maximum width for textContainer
    textAlign: "center",
    overflow: "auto",
    '@media (max-width: 600px)': {
      maxWidth: "300px", // Adjust maximum width for very small screens
    },
  },
  tables: {
    margin: "10px",
    width: "100%",
    maxWidth: "500px", // Set maximum width for tables
    overflow: "auto",
    '@media (max-width: 600px)': {
      maxWidth: "300px", // Adjust maximum width for very small screens
    },
  },
  tableContainer: {
    display: "flex",
    marginBottom: 10,
    width: "100%",
    overflow: "auto",
    '@media (max-width: 600px)': {
      flexDirection: "column", // Stack tables vertically on small screens
    },
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
    '@media (max-width: 600px)': {
      padding: "3px 5px", // Reduce padding for small screens
      fontSize: "0.8rem", // Reduce font size for small screens
    },
  },
});
