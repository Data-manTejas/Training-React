import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('https://json-placeholder.mock.beeceptor.com/login', data);
      setToken(response.data.token);
      navigate('/dashboard');
      toast.success('Login successful!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Login failed: Invalid credentials');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', { required: 'Email is required' })}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register('password', { required: 'Password is required' })}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;