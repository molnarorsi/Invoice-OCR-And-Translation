import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        marginTop: "10%",
        width: "50%",
        height: "300px",
        borderRadius: 50,
        color: "#efb11d",
        fontFamily: "'Staatliches', sans-serif !important",
        backgroundColor: "#d6536d",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: "all 0.3s ease",
        '&:hover': {
            transform: "scale(1.05)",
        },
        '@media (max-width: 800px)': {
            width: "90%",
            minHeight: "auto",
        },
        '@media (max-width: 600px)': {
            flexDirection: "column",
        },
    },
    actionButton: { // Add this new style for the buttons in OCRCard
        fontFamily: "'Staatliches', sans-serif !important",
        color: "#efb11d !important",
        backgroundColor: "transparent",
        border: "2px solid #efb11d !important",
        borderRadius: "50px !important",
        '&:hover': {
            backgroundColor: "#efb11d",
            color: "#d6536d !important",
        },
        padding: "5px 10px",
        alignItems: "center",
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Optional, for vertical centering
    },
});