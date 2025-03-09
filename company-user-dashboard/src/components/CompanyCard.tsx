import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface Company {
  id: number;
  name: string;
  domain: string;
  marketCap: number;
  logo?: string; 
}

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, cursor: 'pointer' }}>
      <CardContent>
        
        {company.logo && (
          <Avatar
            src={company.logo}
            alt={company.name}
            sx={{ width: 56, height: 56, marginBottom: 2 }}
          />
        )}

        
        <Typography variant="h6" component="div">
          {company.name}
        </Typography>

        
        <Typography color="text.secondary">{company.domain}</Typography>

        
        <Typography variant="body2">
          Market Cap: ${company.marketCap.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;