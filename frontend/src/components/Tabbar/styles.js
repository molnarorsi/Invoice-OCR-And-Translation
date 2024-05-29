import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        color:"black",
        width:"100%",
        height:"55px",
        backgroundColor:"#f5f5f5",
        boxShadow:"0px 3px 5px rgba(0, 0, 0, 0.2)",
        borderBottom: "2px solid #f54287",
    },
    tabsContainer: {
        color: "#f54287",
        textDecoration: "none"
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#f54287",
    }
});