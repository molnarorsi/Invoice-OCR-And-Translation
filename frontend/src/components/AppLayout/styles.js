import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    pageWrapper: {
        display: "flex",
        minHeight: "100vh",
        zIndex: 1,
    },
    contentWrapper: {
        width: "100%",
        backgroundColor: "#ebe9e1", // New background color
        position: "relative", // Ensure contentWrapper is positioned relative for absolute positioning of children
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
        zIndex: 0, // Ensure image is in the background
    },
    leftBackgroundImage: {
        position: 'absolute',
        bottom: '10%', // adjust as needed
        left: '10%', // adjust as needed
        width: '900px', // adjust as needed
        height: '900px', // adjust as needed
        transform: 'rotate(-20deg) scaleX(-1)', // rotate and mirror as needed
        zIndex: 0, // Ensure image is in the background
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
    },
    "@keyframes pulseLeft": {
        "0%": {
            transform: 'scale(1) rotate(-20deg) scaleX(-1)',
        },
        "50%": {
            transform: 'scale(1.05) rotate(-20deg) scaleX(-1)', // scale up slightly while maintaining rotation and mirroring
        },
        "100%": {
            transform: 'scale(1) rotate(-20deg) scaleX(-1)', // scale back to original size while maintaining rotation and mirroring
        },
    }
});