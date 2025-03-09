import { Typography, Container, Box, CircularProgress, TextField, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserCard from '../components/UserCard';
import { useUserContext } from '../context/UserContext'; 

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  photo?: string; 
}

const UsersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); 
  const { setSelectedUser } = useUserContext(); 

  
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('https://json-placeholder.mock.beeceptor.com/users');
      return response.data;
    },
  });

  
  const handleUserClick = (user: User) => {
    setSelectedUser(user); 
    navigate(`/users/${user.id}`); 
  };

  
  const filteredUsers = users?.filter((user: User) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return user.name.toLowerCase().includes(lowerCaseSearchTerm); // Search by name only
  });

  
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Users List
      </Typography>

      
      <Box display="flex" gap={2} sx={{ marginBottom: 4 }}>
        <TextField
          fullWidth
          label="Search users by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleClearSearch}
          disabled={!searchTerm}
        >
          Clear
        </Button>
      </Box>

      
      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredUsers?.map((user: User) => (
          <div key={user.id} onClick={() => handleUserClick(user)}>
            <UserCard user={user} />
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default UsersList;