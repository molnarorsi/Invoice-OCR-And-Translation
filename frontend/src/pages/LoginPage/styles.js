import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootContainer: {
    marginTop: 150,
    padding: 20
  },
  loginButton: {
    backgroundColor: "#FE6B8B",
    '&:hover': {
      backgroundColor: "#FF8E53",
    },
  },
  errorText: {
    color: "red",
  },
});