import React from 'react';
import AppLayout from '../../components/AppLayout/AppLayout';
import { Typography, Box } from '@mui/material';
import {useStyles} from './styles';

const InstructionsPage = () => {
    const classes = useStyles();

    return (
        <AppLayout>
            <Box className={classes.instructionsWrapper}>
                <Typography variant="h4">Instructions</Typography>
                <Typography variant="body3">
                    Welcome to the instructions page. Here you will find a list of instructions on how to use the application.
                </Typography>
                <br/>
                <Typography variant="body2"> Dashboard </Typography>
                <Typography variant="body1">
                    1. To get started, upload a file in the dashboard page. Then click next.
                </Typography>
                <Typography variant="body1">
                    2. Once the file is uploaded, you can choose preprocess option for the file.
                </Typography>
                <Typography variant="body1">
                    3. After preprocessing, you can choose the OCR method. For now there is only Tesseract.
                </Typography>
                <Typography variant="body1">
                    4. After choosing the OCR method, you can visualise the uploaded invoice and it's extracted data in the tables.
                    Also, you can translate the text to your preferred language if anything seems wrong or just to check if the extracted data is correct.
                </Typography>
                <br/>
                <Typography variant="body2"> Invoice History </Typography>
                <Typography variant="body1">
                    1. In the invoice history page, you can see all the invoices that you have uploaded.
                </Typography>
                <Typography variant="body1">
                    2. You can revisualize it's content.
                </Typography>
                <br/>
                <Typography variant="body2"> ChatPDF </Typography>
                <Typography variant="body1">
                    1. First, you need to upload a file in the ChatPDF page. Feel free to use ChatPDF whenever you need fast answers about the uploaded file.
                    Tip: You can upload the same file that you have uploaded in the dashboard page, if the OCR wasn't too successful.
                </Typography>
                <Typography variant="body1">
                    2. In the ChatPDF page, you can chat with the bot and ask for help. For starting, you have some example questions about what you can ask from the bot, but feel free to ask anythong about the uploaded file.
                </Typography>
                <Typography variant="body1">
                    3. You can also ask for the instructions on how to use the application.
                </Typography>
                <br/>
                <Typography variant="body2"> Groups </Typography>
                <Typography variant="body1">
                    1. In the groups page, you can create a group and add users to the group.
                </Typography>
                <Typography variant="body1">
                    2. You can also see the groups that you are in.
                </Typography>
                <Typography variant="body1">
                    3. You can also see the users that are in the group.
                </Typography>
            </Box>
        </AppLayout>
    )
};

export default InstructionsPage;