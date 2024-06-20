import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        color:"black",
        width:"100%",
        height:"65px",
        backgroundColor:"#f5f5f5",
        boxShadow:"0px 3px 5px rgba(0, 0, 0, 0.2)",
        borderBottom: "2px solid #f54287",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    tabsContainer: {
        color: "#f54287",
        textDecoration: "none",
        padding: "0 20px",
    },
    typography: {
        fontSize: "1.2 rem",
        fontFamily: "'Staatliches', sans-serif !important",
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#f54287",
    }
});