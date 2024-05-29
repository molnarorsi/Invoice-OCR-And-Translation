import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    pageWrapper: {
        display: "flex",
        minHeight: "100vh",
    },
    contentWrapper: {
        width: "100%",
        backgroundColor: "#f88379",
    },
    customToast: {
        backgroundColor: "#282c34",
        color: "white",
        fontSize: "1.2rem", // fixed typo from "1.2 rem" to "1.2rem"
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
    },
    backgroundImage: {
        position: 'absolute',
        bottom: '10%', // adjust as needed
        right: '10%', // adjust as needed
        width: '900px', // adjust as needed
        height: '900px', // adjust as needed
        animation: '$pulse 2s infinite' // referencing the keyframes
    },
    "@keyframes pulse": {
        "0%": {
            transform: 'scale(1) rotate(20deg)',
        },
        "50%": {
            transform: 'scale(1.05) rotate(20deg)', // scale up slightly while maintaining rotation
        },
        "100%": {
            transform: 'scale(1) rotate(20deg)', // scale back to original size while maintaining rotation
        },
    }
});


