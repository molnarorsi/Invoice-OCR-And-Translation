import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '20px', // Adds space between elements
    color: "#efb11d",
    
  },
  card: {
    width: '100%',
    maxWidth: '700px', // Slightly larger for better readability
    padding: '30px',
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.1)', // Softer shadow
    borderRadius: '10px', // Rounded corners
    fontFamily: "'Staatliches', sans-serif !important",
    backgroundColor: "#d6536d",
  },
  avatar: {
    width: '120px',
    height: '120px',
    margin: 'auto',
    marginBottom: '20px',
    border: '3px solid #007FFF', // Primary color border
  },
  profile: {
    display: 'flex',
    flexDirection: 'column', // Stack information vertically
    alignItems: 'center', // Center-align the text
    gap: '10px', // Adds space between elements
    color: '#333',
    fontWeight: 'bold',
  },
  textField: {
    marginBottom: '20px',
    '& label.Mui-focused': {
      color: '#007FFF', // Primary color for the label when focused
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#007FFF', // Primary color for the border when focused
      },
    },
  },
  button: {
    marginTop: '20px',
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
  },
});