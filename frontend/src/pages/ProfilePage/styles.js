import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Ensure the card is centered horizontally
    justifyContent: 'space-between', // Ensure the card is centered vertically
    margin: '0 auto',
    marginTop: '5%', // Optional: Adjust the top margin as needed
    width: '40%', // Reduced from 50% to make the container smaller
    height: '500px', // Adjusted from 500px to make the container smaller
    borderRadius: 50,
    color: '#efb11d',
    fontFamily: "'Staatliches', sans-serif !important",
    backgroundColor: '#d6536d',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '@media (max-width: 600px)': {
      width: '80%', // Adjusted for responsiveness
      height: 'auto',
    },
    padding: '40px',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '90%', // Adjusted to fit within the container
    padding: '30px',
    paddingBottom: '30px', // Adjusted to reduce the bottom padding
    boxShadow: '0 6px 10px 0 rgba(0,0,0,0.1)',
    borderRadius: '50px', // Corrected to include 'px'
    fontFamily: "'Staatliches', sans-serif !important",
    backgroundColor: '#d6536d',
    boxSizing: 'border-box', // Include padding and border in the element's dimensions
  },
  avatar: {
    width: '120px',
    height: '120px',
    margin: 'auto',
    marginBottom: '20px',
    border: '3px solid #efb11d',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    color: '#333',
    fontWeight: 'bold',
    fontFamily: "'Staatliches', sans-serif !important",
  },
  textField: {
    marginBottom: '20px',
    '& label.Mui-focused': {
      color: '#efb11d',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#efb11d',
      },
    },
  },
  button: {
    marginTop: '20px',
    fontFamily: "'Staatliches', sans-serif !important",
    color: '#efb11d !important',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: '2px solid #efb11d !important',
    borderRadius: '50px !important',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.05)',
    },
    marginBottom: '10px',
  },
});