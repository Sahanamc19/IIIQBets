import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    if ((name === 'password' || name === 'confirmPassword') && value.length > 6) {
      setFormData({
        ...formData,
        [name]: value.slice(0, 6),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleGetStartedClick = () => {
    setIsRegistering(!isRegistering);
  };

  const handleClick = async () => {
    try {
      if (formData.password.length > 6) {
        console.error('Password length should not exceed 6 characters');
        setLoginError('Password length should not exceed 6 characters');
        return;
      }
      const response = await axios.get(
        `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
      );

      if (response.data.length === 1) {
        console.log('Login successful');

        setFormData({ email: '', password: '' });

        setLoginError('');

        router.push('/user');
      window.alert('Login successfully');

      } else {
        // setLoginError('Invalid email or password');
      window.alert('Login failed');

      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegisterClick = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      // Send data to backend (JSON Server)
      const response = await axios.post('http://localhost:3001/users', formData);

      console.log('User registered successfully:', response.data);

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setIsRegistering(false);
      window.alert('Register successfully');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      console.error('Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      console.error('Please enter a valid email address.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match.');
      return false;
    }

    return true;
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleFormChange}
        />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleFormChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {loginError && <div>{loginError}</div>}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  const renderRegisterForm = (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" value={formData.name} onChange={handleFormChange} />
        <TextField
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleFormChange}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
            maxLength: 6,
          }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        sx={{ my: 3 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleRegisterClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleGetStartedClick}>
              {isRegistering ? 'Sign in' : 'Get started'}
            </Link>
          </Typography>

          {!isRegistering && (
            <>
              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:google-fill" color="#DF3E30" />
                </Button>

                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:facebook-fill" color="#1877F2" />
                </Button>

                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                >
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
              </Divider>
            </>
          )}

          {isRegistering ? renderRegisterForm : renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
