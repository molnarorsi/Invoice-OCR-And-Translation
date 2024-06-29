import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useStyles } from "./styles";
import httpRequest from "../../httpRequest";
import { useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const validateEmail = (event) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = event.target.value;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatePassword = (event) => {
    const password = event.target.value;
    if (password.length < 6 && password.length > 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const resp = await httpRequest.post("http://localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setSnackbarSeverity("error");
      if (error.response.status === 401) {
        setSnackbarMessage("Invalid credentials");
      } else {
        setSnackbarMessage("An error occurred");
        console.error("An error occurred:", error);
        // Handle other types of errors, e.g., network error, server error, etc.
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.rootContainer}>
      
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#d6536d",
          justifyContent: "center",
          height:"400px"
        }}
      >
        <Typography component="h1" variant="h5" sx={{fontFamily: "'Staatliches', sans-serif !important", }}>
          Login
        </Typography>
        <Box component="form" onSubmit={submitHandler} validate sx={{ mt: 1, fontFamily: "'Staatliches', sans-serif !important", justifyContent:"center", }}>
          <TextField
          className={classes.textField}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            error={!emailValid}
            helperText={!emailValid && "Invalid email"}
            onBlur={validateEmail}
            FormHelperTextProps={{ className: classes.errorText }}
            sx={{ fontFamily: "'Staatliches', sans-serif !important",border: "2px solid #efb11d !important", borderRadius: "50px !important", }}
          />
          <TextField
          className={classes.textField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            error={!passwordValid}
            helperText={!passwordValid && "Password must be at least 6 characters"}
            onBlur={validatePassword}
            FormHelperTextProps={{ className: classes.errorText }}
            sx={{ fontFamily: "'Staatliches', sans-serif !important",border: "2px solid #efb11d !important", borderRadius: "50px !important", }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="text"
            sx={{ mt: 3, mb: 2 , fontFamily: "'Staatliches', sans-serif !important",  backgroundColor: "transparent", border: "2px solid #efb11d !important", borderRadius: "50px !important",}}
            className={classes.loginButton}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => navigate("/register")}
              >
                {"Don't have an account? Register!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Box>
      
    </Container>
  );
};
export default LoginPage;