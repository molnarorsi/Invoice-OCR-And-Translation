import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        color: "#e43d12", // Change text color to #e43d12
        width: "100%",
        height: "65px",
        backgroundColor: "#ebe9e1", // Change background color to match AppLayout's
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
        borderBottom: "2px solid #f54287",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    tabsContainer: {
        color: "#e43d12", // Change text color to #e43d12
        textDecoration: "none",
        padding: "0 20px",
    },
    typography: {
        fontSize: "1.2rem", // fixed typo from "1.2 rem" to "1.2rem"
        fontFamily: "'Staatliches', sans-serif !important",
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#e43d12", // Change text color to #e43d12
    }
});