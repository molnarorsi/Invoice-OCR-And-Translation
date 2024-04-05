import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    pageWrapper: {
        display: "flex",
        minHeight: "100vh",
    },
    contentWrapper: {
        width: "100%",
        backgroundColor: "#B2B2B2",
    },

    customToast: {
        backgroundColor: "#282c34",
        color: "white",
        fontSize: "1.2 rem",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
    },
});