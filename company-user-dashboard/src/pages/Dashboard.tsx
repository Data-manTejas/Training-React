// import { Typography, Container, Box, CircularProgress } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import UserCard from '../components/UserCard';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: { name: string };
//   address: { city: string };
// }

// interface Company {
//   id: number;
//   name: string;
//   domain: string;
//   marketCapital: string;
// }

// const Dashboard = () => {
 
//   const {
//     data: users,
//     isLoading: isLoadingUsers,
//     isError: isErrorUsers,
//     error: errorUsers,
//   } = useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const response = await axios.get('https://json-placeholder.mock.beeceptor.com/users');
//       return response.data;
//     },
//   });

  
//   const {
//     data: companies,
//     isLoading: isLoadingCompanies,
//     isError: isErrorCompanies,
//     error: errorCompanies,
//   } = useQuery({
//     queryKey: ['companies'],
//     queryFn: async () => {
//       const response = await axios.get('https://json-placeholder.mock.beeceptor.com/companies');
//       return response.data;
//     },
//   });

  
//   if (isLoadingUsers || isLoadingCompanies) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

  
//   if (isErrorUsers || isErrorCompanies) {
//     return (
//       <Typography variant="h6" color="error" align="center">
//         Error: {errorUsers?.message || errorCompanies?.message}
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" align="center" gutterBottom>
//         Dashboard
//       </Typography>

      
//       <Typography variant="h6" gutterBottom>
//         Users
//       </Typography>
//       <Box display="flex" flexWrap="wrap" gap={2}>
//         {/* {users?.map((user) => (
//           <UserCard key={user.id} user={user} />
//         ))} */}
//         {users.length}
//       </Box>

     
//       <Typography variant="h6" gutterBottom mt={4}>
//         Companies
//       </Typography>
//       <Box display="flex" flexWrap="wrap" gap={2}>
        
//         <Typography variant="body1">
//           Total Companies: {companies?.length}
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;

import { Typography, Container, Box, CircularProgress, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UserCard from '../components/UserCard';
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

  if (isLoadingUsers || isLoadingCompanies) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

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

      {/* Clickable Users Card */}
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

      {/* Clickable Companies Card */}
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
    </Container>
  );
};

export default Dashboard;