import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootContainer: {
    marginTop: 150,
    padding: 20,
    backgroundColor: "#ebe9e1",
  },
  loginButton: {
    backgroundColor: "#FE6B8B",
    '&:hover': {
      backgroundColor: "#FF8E53",
    },
    fontFamily: "'Staatliches', sans-serif !important",
  },
  errorText: {
    color: "red",
  },
});