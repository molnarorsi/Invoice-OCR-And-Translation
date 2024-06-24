import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Center items for better UX
        alignItems: "center", // Center items horizontally
        margin: "0 auto",
        marginTop: "10%", // Reduced margin for a more compact look
        width: "50%", // Increased width for better utilization of space
        height: "300px", // Use minHeight for flexibility
        borderRadius: 50,
        color: "#efb11d",
        fontFamily: "'Staatliches', sans-serif !important",
        backgroundColor: "#d6536d",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: "all 0.3s ease",
        '&:hover': {
            transform: "scale(1.05)",
        },
        '@media (max-width: 800px)': { // Adjusted for medium-sized devices
            width: "90%",
            minHeight: "auto",
        },
        '@media (max-width: 600px)': { // Adjusted for small-sized devices
            flexDirection: "column", // Stack items vertically on small screens
        },
    },
    buttonGroup: { // New style for organizing buttons
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px", // Add some space between buttons
        marginTop: "20px",
    },
    actionButton: { // Style for preprocessing and next buttons
        fontFamily: "'Staatliches', sans-serif !important",
        color: "#efb11d !important",
        backgroundColor: "transparent",
        border: "2px solid #efb11d !important",
        borderRadius: "50px !important",
        '&:hover': {
            backgroundColor: "#efb11d",
            color: "#d6536d !important",
        },
        padding: "5px 10px"
    },
    // resetButton: {
    //     color: "#efb11d !important",
    //     fontFamily: "'Staatliches', sans-serif !important",
    //     backgroundColor: "transparent",
    //     border: "2px solid #efb11d !important",
    //     borderRadius: "50px !important",
    //     '&:hover': {
    //         backgroundColor: "transparent",
    //         transform: "scale(1.05)",
    //     },
    //     position: "absolute !important",
    //     top: "2px",
    //     right: "10px",
    // },
});