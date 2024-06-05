import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        margin: "0 auto",
        marginTop: 20,
        width:"30%",
        height:"180px",
        borderRadius: 30,
        color: "black",
        backgroundColor: "white"
    },
    input: {
        margin: "0 auto",
        marginTop: 20,
        width: "70%",
    },
    
    uploadButton: {
        marginTop: "20px",
        color: "#f54287 !important",
        backgroundColor: "transparent", // remove the background
        '&:hover': {
            backgroundColor: "transparent", // remove the background even when hovered
        },
    },
});