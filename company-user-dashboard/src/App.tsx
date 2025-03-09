import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import CompaniesList from './pages/CompaniesList'; 
import CompanyDetails from './pages/CompanyDetails'; 
import useAuthStore from './store/authStore';
import PostsList from './pages/PostsList';
import PostDetails from './pages/PostDetails';
import CommentDetails from './pages/CommentDetails';

function App() {
  const { token } = useAuthStore(); 

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />

        
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

       
        <Route
          path="/users"
          element={token ? <UsersList /> : <Navigate to="/" />}
        />

       
        <Route
          path="/users/:userId"
          element={token ? <UserDetails /> : <Navigate to="/" />}
        />

        
        <Route
          path="/companies"
          element={token ? <CompaniesList /> : <Navigate to="/" />}
        />

        
        <Route
          path="/companies/:companyId"
          element={token ? <CompanyDetails /> : <Navigate to="/" />}
        />
        <Route 
          path="/posts" 
          element={token ? <PostsList /> : <Navigate to="/" />} 
        />
        <Route 
         path="/posts/:postId" 
         element={token ? <PostDetails /> : <Navigate to="/" />} 
         />
        <Route 
         path="/comments/:commentId" 
         element={token ? <CommentDetails /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;