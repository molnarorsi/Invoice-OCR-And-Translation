import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    rootContainer: {
        color: "white",
        width: "100%",
        height: "70px",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        textAlign: "center",
        fontFamily: "'Staatliches', sans-serif",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0 20px",
        '@media (max-width:600px)': {
            flexDirection: "column",
            height: "auto",
        },
        overflowX: 'auto',
    },
    welcomeText: {
        fontSize: "1.3rem", // Increase font size
        fontWeight: "bold",
        padding: "0 10px", // Add some padding
        color: "#097969",
        fontFamily: "'Staatliches', sans-serif !important",
        '@media (max-width:600px)': {
            fontSize: "1rem", // Decrease font size for mobile
        },
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
        fontFamily: "'Staatliches', sans-serif !important",
        '@media (max-width:600px)': {
            marginLeft: "0", // Remove margin for mobile
        },
    },

    linkContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 20px",
        '@media (max-width:600px)': {
            flexDirection: "column",
            margin:"10px 0",
        },

    },
    link: {
        color: "#097969",
        textDecoration: "none",
        fontSize: "1.5rem", // Increase font size
        fontFamily: "'Staatliches', sans-serif",
        padding: "10px",
        transition: "color 0.3s ease-in-out",
        '&:hover': {
            color: "#FFA07A", // Lighter color on hover
        },   
        '@media (max-width:600px)': {
            fontSize: "1rem", // Further decrease font size for mobile
        }, 
    },

    logo: {
        width: "100%", // or any other styling you want
    },
});