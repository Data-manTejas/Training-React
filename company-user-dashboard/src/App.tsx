import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import CompaniesList from './pages/CompaniesList'; // Import CompaniesList
import CompanyDetails from './pages/CompanyDetails'; // Import CompanyDetails
import useAuthStore from './store/authStore';
import PostsList from './pages/PostsList';
import PostDetails from './pages/PostDetails';
import CommentDetails from './pages/CommentDetails';

function App() {
  const { token } = useAuthStore(); // Get the token from the auth store

  return (
    <Router>
      <Routes>
        {/* Login Route (accessible to everyone) */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Route (protected) */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Users List Route (protected) */}
        <Route
          path="/users"
          element={token ? <UsersList /> : <Navigate to="/" />}
        />

        {/* User Details Route (protected) */}
        <Route
          path="/users/:userId"
          element={token ? <UserDetails /> : <Navigate to="/" />}
        />

        {/* Companies List Route (protected) */}
        <Route
          path="/companies"
          element={token ? <CompaniesList /> : <Navigate to="/" />}
        />

        {/* Company Details Route (protected) */}
        <Route
          path="/companies/:companyId"
          element={token ? <CompanyDetails /> : <Navigate to="/" />}
        />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/comments/:commentId" element={<CommentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;