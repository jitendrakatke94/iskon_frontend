import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// sections
import RegistrationForm from '../components/RegistrationForm';

// ----------------------------------------------------------------------


const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {

  return (
    <>
        <Container>
            <ContentStyle>
                <Typography variant="h4" gutterBottom>
                    Sign Up 
                </Typography>

                <RegistrationForm />
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link variant="subtitle2" to="/login" component={RouterLink}>
                    Login
                    </Link>
                </Typography>
            </ContentStyle>
        </Container>
    </>
  );
}
