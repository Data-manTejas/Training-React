import { Typography, Container, Box, CircularProgress, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import CompanyCard from '../components/CompanyCard';

interface Company {
  id: number;
  name: string;
  domain: string;
  marketCap: number;
  logo?: string; // Optional logo URL
}

// Define the state for filtering
interface FilterState {
  minMarketCap: number | '';
  maxMarketCap: number | '';
}

// Define actions for updating the filter state
type FilterAction =
  | { type: 'SET_MIN_MARKET_CAP'; payload: number | '' }
  | { type: 'SET_MAX_MARKET_CAP'; payload: number | '' };

// Reducer function to handle state updates
const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_MIN_MARKET_CAP':
      return { ...state, minMarketCap: action.payload };
    case 'SET_MAX_MARKET_CAP':
      return { ...state, maxMarketCap: action.payload };
    default:
      return state;
  }
};

const CompaniesList = () => {
  const navigate = useNavigate();

  // Initialize state for filtering
  const [filterState, dispatch] = useReducer(filterReducer, {
    minMarketCap: '',
    maxMarketCap: '',
  });

  // Fetch all companies
  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get('https://json-placeholder.mock.beeceptor.com/companies');
      return response.data;
    },
  });

  // Handle click on a company card
  const handleCompanyClick = (companyId: number) => {
    navigate(`/companies/${companyId}`); // Navigate to the company details page
  };

  // Filter companies based on market cap range
  const filteredCompanies = companies?.filter((company: Company) => {
    const { minMarketCap, maxMarketCap } = filterState;
    const marketCap = company.marketCap;

    return (
      (minMarketCap === '' || marketCap >= minMarketCap) &&
      (maxMarketCap === '' || marketCap <= maxMarketCap)
    );
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
        Companies List
      </Typography>

      {/* Filter inputs */}
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Min Market Cap"
          type="number"
          value={filterState.minMarketCap}
          onChange={(e) =>
            dispatch({
              type: 'SET_MIN_MARKET_CAP',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }
        />
        <TextField
          label="Max Market Cap"
          type="number"
          value={filterState.maxMarketCap}
          onChange={(e) =>
            dispatch({
              type: 'SET_MAX_MARKET_CAP',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }
        />
      </Box>

      {/* Display filtered companies */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredCompanies?.map((company: Company) => (
          <div key={company.id} onClick={() => handleCompanyClick(company.id)}>
            <CompanyCard company={company} />
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default CompaniesList;