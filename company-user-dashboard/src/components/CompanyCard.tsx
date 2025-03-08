import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface Company {
  id: number;
  name: string;
  domain: string;
  marketCap: number;
  logo?: string; // Optional logo URL
}

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, cursor: 'pointer' }}>
      <CardContent>
        {/* Company Logo */}
        {company.logo && (
          <Avatar
            src={company.logo}
            alt={company.name}
            sx={{ width: 56, height: 56, marginBottom: 2 }}
          />
        )}

        {/* Company Name */}
        <Typography variant="h6" component="div">
          {company.name}
        </Typography>

        {/* Company Domain */}
        <Typography color="text.secondary">{company.domain}</Typography>

        {/* Company Market Cap */}
        <Typography variant="body2">
          Market Cap: ${company.marketCap.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;