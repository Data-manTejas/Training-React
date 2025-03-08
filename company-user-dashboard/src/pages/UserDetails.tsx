import { Typography, Container, Box, CircularProgress, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Import useUserContext

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>(); // Get the user ID from the URL
  const { selectedUser } = useUserContext(); // Get the selected user from context

  if (!selectedUser || selectedUser.id !== Number(userId)) {
    return (
      <Typography variant="h6" color="error" align="center">
        User not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        User Details
      </Typography>

      {/* User Photo */}
      {selectedUser.photo && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Avatar
            src={selectedUser.photo}
            alt={selectedUser.name}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      )}

      {/* User Details */}
      <Box>
        <Typography variant="h6">Name: {selectedUser.name}</Typography>
        <Typography variant="body1">Email: {selectedUser.email}</Typography>
        <Typography variant="body1">Company: {selectedUser.company || 'N/A'}</Typography>
        <Typography variant="body1">Address: {selectedUser.address || 'N/A'}</Typography>
        <Typography variant="body1">Zip: {selectedUser.zip || 'N/A'}</Typography>
        <Typography variant="body1">State: {selectedUser.state || 'N/A'}</Typography>
        <Typography variant="body1">Country: {selectedUser.country || 'N/A'}</Typography>
        <Typography variant="body1">Phone: {selectedUser.phone || 'N/A'}</Typography>
      </Box>
    </Container>
  );
};

export default UserDetails;