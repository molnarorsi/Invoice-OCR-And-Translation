import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  dialog: {
    padding: '20px', // From UploadCard background color
    color: "#efb11d", // From UploadCard color
    fontFamily: "'Staatliches', sans-serif !important", // From Navbar and UploadCard font family
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)", // From UploadCard boxShadow
    transition: "all 0.3s ease", // From UploadCard transition for smooth effect
  },
  title: {
    color: '#e43d12', // From Navbar link color
    textAlign: 'center',
    fontSize: "1.5rem", // From Navbar link fontSize
    fontFamily: "'Staatliches', sans-serif !important",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontFamily: "'Staatliches', sans-serif !important",
  },
  actions: {
    justifyContent: 'space-between',
    '& button': {
      fontFamily: "'Staatliches', sans-serif", // From Navbar and UploadCard font family
      color: "#efb11d", // From UploadCard color
      backgroundColor: "transparent", // Keeping it consistent with UploadCard button style
      border: "2px solid #efb11d", // From UploadCard button border
      borderRadius: "50px", // From UploadCard button borderRadius
      '&:hover': {
        backgroundColor: "transparent", // Keeping it consistent with UploadCard button hover style
        color: "#FFA07A", // Lighter color on hover from Navbar link hover color
        transform: "scale(1.05)", // From UploadCard button hover transform
      },
    },
  },
});

