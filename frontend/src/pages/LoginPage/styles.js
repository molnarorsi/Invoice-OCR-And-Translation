import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootContainer: {
    display: "flex", // Add this line to make the container a flex container
    flexDirection: "column", // Add this line to align children vertically
    justifyContent: "center", // Add this line to distribute space evenly between children
    alignItems: "center",
    alignContent: "center", // Add this line to center children horizontally
    margin: "0 auto",
    marginTop: 50,
    width:"50%",
    height:"500px",
    borderRadius: 50,
    color: "#efb11d",
    fontFamily: "'Staatliches', sans-serif !important",
    backgroundColor: "#d6536d",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
},
  loginButton: {
    marginTop: "20px",
        fontFamily: "'Staatliches', sans-serif !important",
        color: "#efb11d !important", // Keep button color
        padding: "5px 10px",
        backgroundColor: "transparent", // Keep the background transparent
        border: "2px solid #efb11d !important", // Add a border to the button
        borderRadius: "50px !important", // Round the corners of the button
        '&:hover': {
            backgroundColor: "transparent", // Keep the background transparent when hovered
            transform: "scale(1.05)", // Slightly scale up the button when hovered
        },
        marginBottom: "10px", // Add some space between the button and the input
  },
  errorText: {
    color: "red",
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#efb11d !important', // Your custom border color
      },
      '&:hover fieldset': {
        borderColor: '#efb11d !important', // Custom border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#efb11d !important', // Custom border color when the field is focused
      },
    },
  },
});