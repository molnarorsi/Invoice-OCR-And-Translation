import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex", // Add this line to make the container a flex container
        flexDirection: "column", // Add this line to align children vertically
        justifyContent: "space-between", // Add this line to distribute space evenly between children
        margin: "0 auto",
        marginTop: "10%",
        width:"50%",
        height:"300px",
        borderRadius: 50,
        color: "#efb11d",
        fontFamily: "'Staatliches', sans-serif !important",
        backgroundColor: "#d6536d",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: "all 0.3s ease",
        '&:hover': {
            transform: "scale(1.05)",
        },
        '@media (max-width: 600px)': { // Add this media query to make the card responsive
            width: "90%",
            height: "auto",
        },
    },
    input: {
        margin: "0 auto",
        marginTop: 20,
        width: "70%",
        border: "2px solid #efb11d", // Add a border to the input
        borderRadius: "5px", // Round the corners of the input
    },
    
    uploadButton: {
        marginTop: "20px",
        fontFamily: "'Staatliches', sans-serif !important",
        color: "#efb11d !important", // Keep button color
        backgroundColor: "transparent", // Keep the background transparent
        border: "2px solid #efb11d !important", // Add a border to the button
        borderRadius: "50px !important", // Round the corners of the button
        '&:hover': {
            backgroundColor: "transparent", // Keep the background transparent when hovered
            transform: "scale(1.05)", // Slightly scale up the button when hovered
        },
    },
});