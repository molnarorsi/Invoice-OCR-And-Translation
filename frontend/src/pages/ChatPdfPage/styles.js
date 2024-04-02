import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    chatpdfContainer: {
        fontFamily: 'Arial, sans-serif', 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        width: '500 px',
        margin: '20px auto',
        padding: '20 px',
        border: '1px solid #ddd',
        borderRadius: '8 px',
    },
    uploadSection: {
        textAlign: 'center',
        marginBottom: '20 px',
    },
    uploadButton: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '5 px',
        cursor: 'pointer',
    },
    chatArea: { 
        width: '100%',
        height: '350 px',
        overflowY: 'auto',
        padding: '15 px',
        border: '1px solid #eee',
        borderRadius: '5 px'
    },
    chatMessage: {
        marginBottom: '15 px', 
        padding: '10px 15px',
        borderRadius: '8 px',
        maxWidth: '70%',
        wordWrap: 'break-word',
    },
    chatMessageUser: {
        backgroundColor: '#e0e0e0',
        alignSelf: 'flex-end',
    },
    chatMessageBot: {
        backgroundColor: '#f0f8ff',
        alignSelf: 'flex-start',
    }
}));

export default useStyles; 
