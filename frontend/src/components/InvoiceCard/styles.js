import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    invoiceCard: {
        margin: 10,
        cursor: "pointer",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
            boxShadow: "0 0 10px 0 rgba(33,33,33,0.2)",
        },
    },
});