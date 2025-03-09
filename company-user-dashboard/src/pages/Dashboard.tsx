import { Typography, Container, Box, CircularProgress, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  address: { city: string };
}

interface Company {
  id: number;
  name: string;
  domain: string;
  marketCapital: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('https://json-placeholder.mock.beeceptor.com/users');
      return response.data;
    },
  });

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
    error: errorCompanies,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get('https://json-placeholder.mock.beeceptor.com/companies');
      return response.data;
    },
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    },
  });

  if (isLoadingUsers || isLoadingCompanies || isLoadingPosts) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isErrorUsers || isErrorCompanies || isErrorPosts) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {errorUsers?.message || errorCompanies?.message || errorPosts?.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      {/* Users Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          }
        }}
        onClick={() => navigate('/users')}
      >
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>
        <Typography variant="h3" color="primary">
          {users.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Click to view all users
        </Typography>
      </Paper>

      {/* Companies Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          mb: 4,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          }
        }}
        onClick={() => navigate('/companies')}
      >
        <Typography variant="h6" gutterBottom>
          Companies
        </Typography>
        <Typography variant="h3" color="primary">
          {companies.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Click to view all companies
        </Typography>
      </Paper>

      {/* Posts Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          }
        }}
        onClick={() => navigate('/posts')}
      >
        <Typography variant="h6" gutterBottom>
          Posts
        </Typography>
        <Typography variant="h3" color="primary">
          {posts.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Click to view all posts
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;