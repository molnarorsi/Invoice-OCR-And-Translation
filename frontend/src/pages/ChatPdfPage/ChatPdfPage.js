import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Avatar
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'; 
import SendIcon from '@mui/icons-material/Send';
import useStyles from './styles';
import { Document, Page } from 'react-pdf';


const ChatPdfPage = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [pdfSourceId, setPdfSourceId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    

    const apiKey = 'sec_0LSWqNmRjyNhtR0rwJx1elsFHZo5rbEW'; 

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
               alert("File format likely not supported or file size exceeds the limit. (PDF only, up to 32 MB)");
            } else {
               alert("An error occurred while uploading. Please check the console and try again."); 
            }
        } finally {
            setIsLoading(false);
        }
        setPdfFile(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        console.log(pdfSourceId, newMessage);

        try {
            const response = await axios.post('/send-message', {
                sourceId: pdfSourceId,
                messages: [{ role: 'user', content: newMessage }]
            }, { headers: { 'x-api-key': apiKey }});

            console.log('ChatPDF Response:', response.data);

            console.log({ 
                sourceId: pdfSourceId,
                messages: [{ role: 'user', content: newMessage }] 
            });

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
        <div className={classes.chatpdfContainer}>
            <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
                {pdfSourceId === null ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">Upload or Add PDF</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <InputLabel htmlFor="upload-pdf">Upload PDF</InputLabel>
                            <OutlinedInput
                                id="upload-pdf"
                                type="file"
                                fullWidth
                                onChange={handleFileUpload} 
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <UploadIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Upload PDF" 
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <div className={classes.chatArea}>
                        <List>
                            {messages.map((msg, index) => (
                                <ListItem key={index} className={classes.chatMessage}>  
                                    <ListItemIcon>
                                        <Avatar>
                                            {msg.sender === 'user' ? 'U' : 'B'} 
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={msg.text}
                                        className={msg.sender === 'user' ? classes.chatMessageUser : classes.chatMessageBot} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Ask a question"
                                variant='outlined'
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton type="submit" disabled={isLoading}>
                                            <SendIcon />
                                        </IconButton>
                                    )
                                }}
                            />
                        </form>
                        {pdfFile && (
    <Document file={pdfFile}>
        <Page pageNumber={1} />
    </Document>
)}
                    </div>
                    
                )}
            </Paper>
        </div>
    );
};

export default ChatPdfPage;