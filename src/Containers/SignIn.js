import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
     Made by Rahul Prasad
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {


  const history = useHistory();
  
  const [userlist, setProduct] = useState([]);
   const initialValues = {
      username: '',
      password: '',
      remember: false
  }

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:4003/results"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  
  const validationSchema = Yup.object().shape({
    username: Yup.string().email('please enter valid email').required("Required"),
    password: Yup.string().required("Required")
})
  
  const onSubmit = (values, props) => {
    if (userlist.length > 0 && userlist.find(user => user.username === values.username && user.password === values.password)) 
    {  
    history.push('/fakeapi');
    alert("login success");
   }
else {
  // console.log("User doesn't exists. Show error message");
  alert("login failed");
 }
console.log('text')
}


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                  {(props) => (
                      <Form>
                          <Field as={TextField} label='Username' name="username"
                              placeholder='Enter username' fullWidth required
                              helperText={<ErrorMessage name="username" />}
                          />
                          <Field as={TextField} label='Password' name="password"
                              placeholder='Enter password' type='password' fullWidth required
                              helperText={<ErrorMessage name="password" />} />
                          <Field as={FormControlLabel}
                              name='remember'
                              control={
                                  <Checkbox
                                      color="secondary"
                                  />
                              }
                              label="Remember me"
                          />
                              <Button
                          type="submit"
                          fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} >
                            Sign In
                           </Button>

                      </Form>
                  )}
              </Formik>
         
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}