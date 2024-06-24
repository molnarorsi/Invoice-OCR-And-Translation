// frontend/src/components/Footer/Footer.js
import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: '#ebe9e1', // Example background color
    color: '#e43d12',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    fontWeight: "bold !important",
    fontFamily: "'Staatliches', sans-serif !important",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerContainer}>
      <Typography variant="body1">© 2023 Your Company Name</Typography>
    </div>
  );
};

export default Footer;