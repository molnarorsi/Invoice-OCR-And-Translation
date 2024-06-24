import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  table: {
    margin: "auto",
    width: "80%",
    height: "calc(100% - 60px)", // Adjusted to account for the footer's height
    overflow: "auto",
    paddingBottom: "60px", // Added padding at the bottom equal to the footer's height
  },
});