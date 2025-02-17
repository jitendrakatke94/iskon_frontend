import React from "react";
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { LoginSchema } from './schema/login';
// import {FormProvider} from '../components/hook-form/FormProvider';
import { FormProvider } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";

const initialvalues = {
    email: '',
    password: ''
}
function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
    initialValues: initialvalues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
        await login(values.email, values.password); // Call login function from Context API
        navigate('/dashboard', { replace: true });
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
            <FormProvider >
                <form onSubmit={handleSubmit}>
                    <Container maxWidth="sm">
                        
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            variant="outlined"
                            touched={touched.email}
                            error={errors.email}
                            helperText={errors?.message}
                        />
                        {errors.email && touched.email && <Typography>{errors.email}</Typography>}
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            value={values.password}
                            variant="outlined"
                            touched={touched.password}
                            error={errors.password}
                            helperText={errors?.message}
                        />
                        {errors.password && touched.password && <Typography>{errors.password}</Typography>}
                        <Box sx={{ py: 2 }}>
                            <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            >
                            Sing In
                            </Button>
                        </Box>
                        
                    </Container>
                </form>
            </FormProvider>
        </Box>
    </>
  );
}

export default LoginForm;