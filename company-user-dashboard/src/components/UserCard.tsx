import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  photo?: string; 
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, cursor: 'pointer' }}>
      <CardContent>
        
        {user.photo && (
          <Avatar
            src={user.photo}
            alt={user.name}
            sx={{ width: 56, height: 56, marginBottom: 2 }}
          />
        )}

        
        <Typography variant="h6" component="div">
          {user.name}
        </Typography>

        
        <Typography color="text.secondary">{user.email}</Typography>

        
        <Typography variant="body2">
          Company: {user.company || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;