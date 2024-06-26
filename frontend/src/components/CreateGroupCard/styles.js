import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
        marginTop: "10%",
        width: "50%",
        height: "600px",
        borderRadius: 50,
        color: "#efb11d",
        fontFamily: "'Staatliches', sans-serif !important",
        backgroundColor: "#d6536d",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: "all 0.3s ease",
        '&:hover': {
            transform: "scale(1.05)",
        },
        '@media (max-width: 600px)': {
            width: "90%",
            height: "auto",
        },
    },
    inputContainer: {
        margin: "0 auto",
        marginTop: 20,
        width: "70%",
        border: "2px solid #efb11d",
        borderRadius: "5px",
    },
    createButton: {
        cmarginTop: "20px",
        fontFamily: "'Staatliches', sans-serif !important",
        color: "#efb11d !important",
        padding: "5px 10px",
        backgroundColor: "transparent",
        border: "2px solid #efb11d !important",
        borderRadius: "50px !important",
        '&:hover': {
            backgroundColor: "transparent",
            transform: "scale(1.05)",
        },
        marginBottom: "10px",
    }
});