import { Typography, Container, Box, CircularProgress, TextField, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserCard from '../components/UserCard';
import { useUserContext } from '../context/UserContext'; // Import useUserContext

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  photo?: string; // Optional photo URL
}

const UsersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const { setSelectedUser } = useUserContext(); // Get setSelectedUser from context

  // Fetch all users
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

  // Handle click on a user card
  const handleUserClick = (user: User) => {
    setSelectedUser(user); // Store the selected user in context
    navigate(`/users/${user.id}`); // Navigate to the user details page
  };

  // Filter users based on search term (name only)
  const filteredUsers = users?.filter((user: User) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return user.name.toLowerCase().includes(lowerCaseSearchTerm); // Search by name only
  });

  // Clear the search term
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

      {/* Search Bar and Clear Button */}
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

      {/* Filtered Users List */}
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