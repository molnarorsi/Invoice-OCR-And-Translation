import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    chartContainer: {
        display: 'flex',
        justifyContent: 'center', // Center the charts horizontally
        flexWrap: 'nowrap', // Prevent the charts from wrapping
        gap: '20px', // Optional: add some space between the charts
    },
});