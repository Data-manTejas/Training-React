import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UserCard from '../components/UserCard';

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

const Dashboard = () => {
  // Fetch users
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

  // Fetch companies
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

  
  if (isLoadingUsers || isLoadingCompanies) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if either users or companies fetch fails
  if (isErrorUsers || isErrorCompanies) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {errorUsers?.message || errorCompanies?.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      {/* Users Section */}
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))} */}
        {users.length}
      </Box>

      {/* Companies Section */}
      <Typography variant="h6" gutterBottom mt={4}>
        Companies
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* Display the number of companies */}
        <Typography variant="body1">
          Total Companies: {companies?.length}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;