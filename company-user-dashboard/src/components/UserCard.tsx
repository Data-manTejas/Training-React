import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  photo?: string; // Optional photo URL
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, cursor: 'pointer' }}>
      <CardContent>
        {/* User Photo */}
        {user.photo && (
          <Avatar
            src={user.photo}
            alt={user.name}
            sx={{ width: 56, height: 56, marginBottom: 2 }}
          />
        )}

        {/* User Name */}
        <Typography variant="h6" component="div">
          {user.name}
        </Typography>

        {/* User Email */}
        <Typography color="text.secondary">{user.email}</Typography>

        {/* User Company */}
        <Typography variant="body2">
          Company: {user.company || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;