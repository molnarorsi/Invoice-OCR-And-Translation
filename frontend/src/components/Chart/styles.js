import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  center: {
    position: "absolute",
    top: "70px",
    left: "55%",
    transform: "translate(-50%, 0)",
    width: "650px",
    width: "90vw", // Use viewport width for responsiveness
    maxWidth: "650px", // Set a max-width to prevent the chart from becoming too large
  },
  title: {
    textAlign: "center",
    margin: 15,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    color: "red",
    marginTop: 15,
    marginLeft: 10,
  },
  centerScore: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "black",
    cursor: "pointer",
  },
  centerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "black",
  },
  chartContainer: {
    width: "100%", // Make the chart container width responsive
    maxWidth: "325px", // Set a max-width to maintain aspect ratio
    margin: "0 auto",
  },
  paragraph: {
    position: "absolute",
    margin: "0",
    padding: "0",
    top: "90%",
    left: "58%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.2rem",
    width: "400px",
  },
});