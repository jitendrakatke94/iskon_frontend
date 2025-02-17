import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { RegisterationSchema } from './schema/Register';
import { useFormik } from 'formik';

const initialvalues = {
    name: '',
    email: '',
    password: '',
    confirm_password:''
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState();

  const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
    initialValues: initialvalues,
    validationSchema: RegisterationSchema,
    onSubmit: async (values) => {
      const reqData = {
        name: values.name,
        email: values.email,
        password_hash: values.password,
      };
      const url = 'http://localhost:5454/admin/registration'
      await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(reqData),
      }).then((resp) => resp.json())
      .then((newQuestion) => setResponse(newQuestion)).catch((e) => console.log(e));
      if (response['status'] === true) {
          alert("Registration Completed, please sign in");
          navigate('/login', { replace: true });
      } else {
          navigate('/register', { replace: true });
      }
    }
  });
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <FormProvider>
          <form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
                <TextField
                    fullWidth
                    label="name"
                    margin="normal"
                    name="name"
                    value={values.name}
                    variant="outlined"
                    onChange={handleChange}
                    touched={touched.name}
                    error={errors.name}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && <Typography>{errors.name}</Typography>}
                <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                    touched={touched.email}
                    error={errors.email}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.email && touched.email && <Typography>{errors.email}</Typography>}
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    touched={touched.password}
                    error={errors.password}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.password && touched.password && <Typography>{errors.password}</Typography>}
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="confirm_password"
                    onChange={handleChange}
                    type="password"
                    value={values.confirm_password}
                    variant="outlined"
                    touched={touched.confirm_password}
                    error={errors.confirm_password}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.confirm_password && touched.confirm_password && <Typography>{errors.confirm_password}</Typography>}
                <Box sx={{ py: 2 }}>
                    <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    >
                    Sign up now
                    </Button>
                </Box>
            </Container>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default RegistrationForm;
