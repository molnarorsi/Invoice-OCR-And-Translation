// frontend/src/components/Tabbar/styles.js
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        color: "#e43d12",
        width: "250px", // Adjust width as needed
        height: "100vh", // Full height
        backgroundColor: "#ebe9e1",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
        position: "fixed",
        left: 0,
        top: "70px", // Adjust top position as needed
        display: "flex",
        flexDirection: "column",
    },
    tabsContainer: {
        color: "#e43d12",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "start", // Align items to the start
        padding: "20px", // Add some padding
    },
    typography: {
        fontSize: "1.2rem",
        fontFamily: "'Staatliches', sans-serif !important",
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#e43d12",
        textAlign: "left", // Align text to the left
    }
});