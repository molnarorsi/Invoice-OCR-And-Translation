import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f88379',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chatpdfContainer: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: "#ffffff",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Ensure this container is positioned relative to the root
    zIndex: 2, // Set a higher z-index for the container
  },
  uploadSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  uploadButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
  },
  messageList: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '20px',
  },
  chatMessage: {
    marginBottom: '15px',
    padding: '10px 15px',
    borderRadius: '8px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chatMessageUser: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  chatMessageBot: {
    backgroundColor: '#f0f8ff',
    alignSelf: 'flex-start',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  textField: {
    flexGrow: 1,
  },
  sendButton: {
    marginLeft: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
  },
  pdfViewer: {
    width: '100%',
    marginTop: '20px',
    textAlign: 'center',
  },
  pdfPage: {
    display: 'inline-block',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cornerImageContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '250%', // Set relative width for responsiveness
    maxWidth: '800px', // Set a maximum width
    zIndex: 1, // Lower z-index for the image
  },
  cornerImage: {
    width: '100%', // Make the image take the full width of its container
    height: 'auto', // Maintain aspect ratio
  },
}));

export default useStyles;
