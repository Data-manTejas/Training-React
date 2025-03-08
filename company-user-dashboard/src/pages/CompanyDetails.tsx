import { Typography, Container, Box, CircularProgress, Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Company {
  id: number;
  name: string;
  address: string;
  zip: string;
  country: string;
  employeeCount: number;
  industry: string;
  marketCap: number;
  domain: string;
  logo?: string; // Optional logo URL
  ceoName: string;
}

const CompanyDetails = () => {
  const { companyId } = useParams<{ companyId: string }>(); // Get the company ID from the URL

  // Fetch company details
  const {
    data: company,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      const response = await axios.get(
        `https://json-placeholder.mock.beeceptor.com/companies/${companyId}`
      );
      return response.data;
    },
  });

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
        Company Details
      </Typography>

      {/* Company Logo */}
      {company?.logo && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Avatar
            src={company.logo}
            alt={company.name}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      )}

      {/* Company Details */}
      <Box>
        <Typography variant="h6">Name: {company?.name}</Typography>
        <Typography variant="body1">Domain: {company?.domain || 'N/A'}</Typography>
        <Typography variant="body1">
          Market Cap: ${company?.marketCap.toLocaleString() || 'N/A'}
        </Typography>
        <Typography variant="body1">Address: {company?.address || 'N/A'}</Typography>
        <Typography variant="body1">Zip: {company?.zip || 'N/A'}</Typography>
        <Typography variant="body1">Country: {company?.country || 'N/A'}</Typography>
        <Typography variant="body1">
          Employee Count: {company?.employeeCount || 'N/A'}
        </Typography>
        <Typography variant="body1">Industry: {company?.industry || 'N/A'}</Typography>
        <Typography variant="body1">CEO: {company?.ceoName || 'N/A'}</Typography>
      </Box>
    </Container>
  );
};

export default CompanyDetails;