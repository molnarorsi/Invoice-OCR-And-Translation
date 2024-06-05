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
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 20px",
    },
    welcomeText: {
        fontSize: "1.5rem", // Increase font size
        fontWeight: "bold",
        padding: "0 10px", // Add some padding
        color: "#097969",
        fontFamily: "'Playfair Display', serif !important", // Change font style
    },
    logoutButton: {
        backgroundColor: "#FE6B8B",
        color: "#FE6B8B !important",
        transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
        '&:hover': {
            backgroundColor: "#FF8E53",
            transform: "scale(1.05)",
        },
        marginLeft: "100px",
        fontWeight: "bold !important",
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 20px",

    },
    link: {
        color: "#097969",
        textDecoration: "none",
        fontSize: "1.5rem", // Increase font size
        fontFamily: "'Playfair Display', serif", // Change font style
        padding: "10px",
        transition: "color 0.3s ease-in-out",
        '&:hover': {
            color: "#FFA07A", // Lighter color on hover
        },    
    },
    logo: {
        width: "100%", // or any other styling you want
    },
});