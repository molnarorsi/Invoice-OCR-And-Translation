import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    rootContainer: {
        color: "white",
        width: "100%",
        height: "70px",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
    },
    welcomeText: {
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#FE6B8B",
        color: "white",
        '&:hover': {
            backgroundColor: "#FF8E53",
        },
    },
});