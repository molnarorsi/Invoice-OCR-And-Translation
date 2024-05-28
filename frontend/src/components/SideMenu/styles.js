import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    rootContainer: {
        color: "white",
        width: "15%",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    linkContainer: {
        marginTop: 40, 
    },
    link: {
        color: "white",
        textDecoration: "none",
        '&:hover': {
            color: "#FE6B8B",
        },
    },

    logo: {
        width: "100%", // or any other styling you want
    },
});