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
import { EventSchema } from './schema/Register';
import { useFormik } from 'formik';

const initialvalues = {
    title: '',
    description: '',
    date: '',
    location:'',
    category:''
}

const AddEditEvent = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
    initialValues: initialvalues,
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      const reqData = {
        title: values.title,
        description: values.description,
        date: values.date,
        location: values.location,
        category: values.category
      };
        if (isEditing) {
            const url = 'http://localhost:5454/admin/editEvent'
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
        } else {
            const url = 'http://localhost:5454/admin/addEvent'
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
                    label="title"
                    margin="normal"
                    name="title"
                    value={values.title}
                    variant="outlined"
                    onChange={handleChange}
                    touched={touched.title}
                    error={errors.title}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.title && touched.title && <Typography>{errors.title}</Typography>}
                <TextField
                    fullWidth
                    label="description"
                    margin="normal"
                    name="description"
                    onChange={handleChange}
                    type="description"
                    value={values.description}
                    variant="outlined"
                    touched={touched.description}
                    error={errors.description}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.description && touched.description && <Typography>{errors.description}</Typography>}
                <TextField
                    fullWidth
                    label="date"
                    margin="normal"
                    name="date"
                    onChange={handleChange}
                    type="date"
                    value={values.date}
                    variant="outlined"
                    touched={touched.date}
                    error={errors.date}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.date && touched.date && <Typography>{errors.date}</Typography>}
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" mb={5} sx={{ m: 2 }} spacing={3}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                          sx={{ width: 300 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.location}
                          label="Posting"
                          name="posting"
                          onChange={(e) => handleChangeInput(e, i)}
                          defaultValue="Monthly"
                        >
                          <MenuItem selected value="Monthly">
                            Monthly
                          </MenuItem>
                          <MenuItem value="Quaterly">Quaterly</MenuItem>
                        </Select>
                     </FormControl>
                    {errors.location && touched.location && <Typography>{errors.location}</Typography>}
                </Stack>
                <TextField
                    fullWidth
                    label="category"
                    margin="normal"
                    name="category"
                    onChange={handleChange}
                    type="category"
                    value={values.category}
                    variant="outlined"
                    touched={touched.category}
                    error={errors.category}
                    helperText={errors?.message}
                    onBlur={handleBlur}
                />
                {errors.category && touched.category && <Typography>{errors.category}</Typography>}
                <Box sx={{ py: 2 }}>
                    <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    >
                    Submit
                    </Button>
                </Box>
            </Container>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddEditEvent;
