import React, { useState } from 'react';
import axios from 'axios';
import AppLayout from "../../components/AppLayout/AppLayout";
import { 
    Button, 
    TextField, 
    Paper, 
    Typography,
    Grid,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Snackbar,
    Box
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'; 
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import useStyles from './styles';
import { Document, Page, pdfjs } from 'react-pdf';
import image from "../../assets/robot.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChatPdfPage = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [pdfSourceId, setPdfSourceId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const apiKey = 'sec_0LSWqNmRjyNhtR0rwJx1elsFHZo5rbEW'; 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function zoomIn() {
        setScale(prevScale => prevScale + 0.1);
    }

    function zoomOut() {
        setScale(prevScale => prevScale - 0.1);
    }

    const handleFileUpload = async (event) => {
        setIsLoading(true); 
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file); 
    
        try {
            const response = await axios.post('/upload-file', formData, {
                headers: { 'x-api-key': apiKey }
            });
            setPdfSourceId(response.data.sourceId); 
        } catch (error) {
            console.error('Error uploading file:', error.response);
    
            if (error.response.status === 400) {
                setErrorMessage("File format likely not supported or file size exceeds the limit. (PDF only, up to 32 MB)");
            } else {
                setErrorMessage("An error occurred while uploading. Please check the console and try again."); 
            }
            setOpen(true);
        } finally {
            setIsLoading(false);
        }
        setPdfFile(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/send-message', {
                sourceId: pdfSourceId,
                messages: [{ role: 'user', content: newMessage }]
            }, { headers: { 'x-api-key': apiKey }});

            setMessages([...messages, 
                { text: newMessage, sender: 'user' },
                { text: response.data.content, sender: 'bot' }
            ]); 
            setNewMessage(''); 
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout>
        <Box className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Paper className={classes.chatpdfContainer}>
                <Typography variant="h5" className={classes.title}>
                    Chat & PDF Viewer
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <List className={classes.messageList}>
                            {messages.map((message, index) => (
                                <ListItem key={index} className={message.sender === 'user' ? classes.chatMessageUser : classes.chatMessageBot}>
                                    <ListItemIcon>
                                        <Avatar>{message.sender.charAt(0).toUpperCase()}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={message.text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <OutlinedInput
                                id="message-input"
                                type="text"
                                value={newMessage}
                                onChange={event => setNewMessage(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            color="primary"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                fullWidth
                            />
                        </form>
                    </Grid>
                    <Grid item xs={6} className={classes.pdfViewer}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadIcon />}
                            className={classes.uploadButton}
                            disabled={isLoading}
                        >
                            Upload PDF
                            <input
                                type="file"
                                hidden
                                onChange={handleFileUpload}
                            />
                        </Button>
                        {pdfFile && (
                            <div>
                                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} scale={scale} className={classes.pdfPage} />
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                                <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                                    Previous
                                </Button>
                                <Button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                                    Next
                                </Button>
                                <Button type="button" onClick={zoomIn}>
                                    Zoom In
                                </Button>
                                <Button type="button" onClick={zoomOut}>
                                    Zoom Out
                                </Button>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <div className={classes.cornerImageContainer}>
                <img src={image} alt="Robot" className={classes.cornerImage} />
            </div>
        </Box>
        </AppLayout>
    );
};

export default ChatPdfPage;
